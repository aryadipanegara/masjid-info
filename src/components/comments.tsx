"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  MessageCircle,
  Send,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  avatar: string | null;
};

type Comment = {
  id: string;
  message: string;
  created_at: string;
  updated_at: string;
  id_user: string;
  user: User;
  replies: Comment[];
  id_replies_discussion: string | null;
};

export default function Component() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState<{ [key: string]: string }>({});
  const [editingComment, setEditingComment] = useState<{
    id: string;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    type: string;
  } | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("newest");
  const { id: detailMasjidId } = useParams();
  const router = useRouter();

  const checkUserLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setCurrentUser({
        id: decodedToken.id,
        name: decodedToken.name,
        avatar: decodedToken.avatar,
      });
      return true;
    }
    return false;
  };

  const fetchComments = async (detailMasjidId: string) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://masjidinfo-backend.vercel.app/api/detailmasjids/${detailMasjidId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Gagal mengambil data diskusi.");
      }
      const data = await response.json();
      const nestedComments = nestComments(data.discussions);
      setComments(nestedComments);
    } catch (error) {
      console.error("Error fetching discussions:", error);
      setAlertInfo({
        message: "Gagal mengambil data diskusi. Silakan coba lagi.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nestComments = (comments: Comment[]): Comment[] => {
    const commentMap: { [key: string]: Comment } = {};
    const rootComments: Comment[] = [];

    comments.forEach((comment) => {
      commentMap[comment.id] = { ...comment, replies: [] };
    });

    comments.forEach((comment) => {
      if (comment.id_replies_discussion) {
        const parentComment = commentMap[comment.id_replies_discussion];
        if (parentComment) {
          parentComment.replies.push(commentMap[comment.id]);
        }
      } else {
        rootComments.push(commentMap[comment.id]);
      }
    });

    return rootComments;
  };

  const handleAddComment = async () => {
    if (!isUserLoggedIn) {
      setAlertInfo({
        message: "Silakan login terlebih dahulu.",
        type: "warning",
      });
      return router.push("/auth/login");
    }
    if (newComment.trim() === "") {
      setAlertInfo({ message: "Komentar tidak boleh kosong.", type: "error" });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://masjidinfo-backend.vercel.app/api/discussions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            message: newComment,
            id_replies_discussion: null,
            id_detail_masjid: detailMasjidId,
            id_user: currentUser?.id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Gagal menambahkan komentar.");
      }
      const addedComment = await response.json();
      setComments([...comments, { ...addedComment, replies: [] }]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setAlertInfo({
        message: "Gagal menambahkan komentar. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  const handleAddReply = async (commentId: string) => {
    if (!isUserLoggedIn) {
      setAlertInfo({
        message: "Silakan login terlebih dahulu.",
        type: "warning",
      });
      return router.push("/auth/login");
    }
    if (newReply[commentId]?.trim() === "") {
      setAlertInfo({ message: "Balasan tidak boleh kosong.", type: "error" });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://masjidinfo-backend.vercel.app/api/discussions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            message: newReply[commentId],
            id_replies_discussion: commentId,
            id_detail_masjid: detailMasjidId,
            id_user: currentUser?.id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Gagal menambahkan balasan.");
      }
      const addedReply = await response.json();
      setComments(updateCommentsWithNewReply(comments, commentId, addedReply));
      setNewReply((prev) => ({ ...prev, [commentId]: "" }));
    } catch (error) {
      console.error("Error adding reply:", error);
      setAlertInfo({
        message: "Gagal menambahkan balasan. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  const updateCommentsWithNewReply = (
    comments: Comment[],
    parentId: string,
    newReply: Comment
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentsWithNewReply(
            comment.replies,
            parentId,
            newReply
          ),
        };
      }
      return comment;
    });
  };

  const handleEditComment = async (commentId: string, newMessage: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://masjidinfo-backend.vercel.app/api/discussions/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ message: newMessage }),
        }
      );
      if (!response.ok) {
        throw new Error("Gagal mengedit komentar.");
      }
      const updatedComment = await response.json();
      setComments(updateCommentsAfterEdit(comments, commentId, updatedComment));
      setEditingComment(null);
    } catch (error) {
      console.error("Error editing comment:", error);
      setAlertInfo({
        message: "Gagal mengedit komentar. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  const updateCommentsAfterEdit = (
    comments: Comment[],
    commentId: string,
    updatedComment: Comment
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, ...updatedComment };
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentsAfterEdit(
            comment.replies,
            commentId,
            updatedComment
          ),
        };
      }
      return comment;
    });
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://masjidinfo-backend.vercel.app/api/discussions/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Gagal menghapus komentar.");
      }
      setComments(deleteCommentFromList(comments, commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      setAlertInfo({
        message: "Gagal menghapus komentar. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  const deleteCommentFromList = (
    comments: Comment[],
    commentId: string
  ): Comment[] => {
    return comments
      .filter((comment) => comment.id !== commentId)
      .map((comment) => ({
        ...comment,
        replies: deleteCommentFromList(comment.replies, commentId),
      }));
  };

  useEffect(() => {
    const loggedIn = checkUserLogin();
    setIsUserLoggedIn(loggedIn);
    if (detailMasjidId) {
      if (Array.isArray(detailMasjidId)) {
        detailMasjidId.forEach((id) => fetchComments(id));
      } else {
        fetchComments(detailMasjidId);
      }
    }
  }, [detailMasjidId]);

  const renderComment = (comment: Comment, depth = 0) => (
    <div
      key={comment.id}
      className={`mb-4 ${depth > 0 ? "ml-8" : ""} p-4 border-b last:border-b-0`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage
              src={comment.user?.avatar || "/placeholder-avatar.jpg"}
              alt={comment.user?.name}
            />
            <AvatarFallback>{comment.user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{comment.user?.name}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        {currentUser?.id === comment.id_user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  setEditingComment({
                    id: comment.id,
                    message: comment.message,
                  })
                }
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your comment.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="mt-2">
        {editingComment?.id === comment.id ? (
          <div className="space-y-2">
            <Textarea
              value={editingComment.message}
              onChange={(e) =>
                setEditingComment({
                  ...editingComment,
                  message: e.target.value,
                })
              }
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingComment(null)}>
                Cancel
              </Button>
              <Button
                onClick={() =>
                  handleEditComment(comment.id, editingComment.message)
                }
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p>{comment.message}</p>
        )}
      </div>
      {comment.replies?.map((reply) => renderComment(reply, depth + 1))}
      <div className="mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setNewReply((prev) => ({ ...prev, [comment.id]: "" }))}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Reply
        </Button>
        {newReply[comment.id] !== undefined && (
          <div className="mt-2 space-y-2">
            <Textarea
              placeholder="Write your reply..."
              value={newReply[comment.id]}
              onChange={(e) =>
                setNewReply((prev) => ({
                  ...prev,
                  [comment.id]: e.target.value,
                }))
              }
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() =>
                  setNewReply((prev) => {
                    const { [comment.id]: _, ...rest } = prev;
                    return rest;
                  })
                }
              >
                Cancel
              </Button>
              <Button onClick={() => handleAddReply(comment.id)}>
                <Send className="mr-2 h-4 w-4" />
                Send Reply
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold">Discussion</h2>
      </div>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="oldest">Oldest</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <ScrollArea className="h-[600px] pr-4">
              {isLoading ? (
                <p className="text-center">Loading comments...</p>
              ) : alertInfo ? (
                <p
                  className={`text-center ${
                    alertInfo.type === "error"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {alertInfo.message}
                </p>
              ) : comments.length > 0 ? (
                comments.map((comment) => renderComment(comment))
              ) : (
                <p className="text-center text-muted-foreground">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full"
          />
          <Button onClick={handleAddComment} className="w-full">
            <MessageCircle className="mr-2 h-4 w-4" />
            Add Comment
          </Button>
        </div>
      </CardFooter>
    </div>
  );
}
