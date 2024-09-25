"use client";

import React, { useEffect, useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertCustom from "@/components/ui/AlertCustom";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  MessageCircle,
  Send,
  CornerDownRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Cookies from "js-cookie";
import Loading from "@/app/loading";

type User = { id: string; name: string; avatar: string };
type Comment = {
  id: string;
  message: string;
  created_at: string;
  updated_at: string;
  id_user: string;
  user?: User;
  replies: Comment[];
  id_replies_discussion: string | null;
};

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  message: string;
  type: AlertType;
  onClose: () => void;
}

export default function DiscussionComponent() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newReplies, setNewReplies] = useState<{ [key: string]: string }>({});
  const [editingComment, setEditingComment] = useState<{
    id: string;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState<AlertProps | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const params = useParams();
  const [detailMasjidId, setDetailMasjidId] = useState<string | null>(null);
  const detailMasjidSlug = params.slug as string | undefined;
  const router = useRouter();

  const checkUserLogin = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const { id, name, avatar } = JSON.parse(atob(token.split(".")[1]));
        setCurrentUser({ id, name, avatar });
        return true;
      } catch (error) {
        console.error("Error parsing token:", error);
        return false;
      }
    }
    return false;
  };

  const fetchUserInfo = async (userId: string): Promise<User> => {
    const token = Cookies.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/public/${userId}`,
      {
        headers: { Authorization: ` ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch user info");
    const userData = await response.json();
    return { id: userData.id, name: userData.name, avatar: userData.avatar };
  };

  const fetchComments = async () => {
    if (!detailMasjidSlug) {
      return;
    }
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/detailmasjids/slug/${detailMasjidSlug}`,
        {
          headers: { Authorization: ` ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch discussions.");

      const data = await response.json();

      setDetailMasjidId(data.id);

      const commentsWithUserInfo = await Promise.all(
        data.discussions.map(async (comment: Comment) => {
          const userInfo = await fetchUserInfo(comment.id_user);
          return { ...comment, user: userInfo };
        })
      );

      setComments(nestComments(commentsWithUserInfo));
    } catch (error) {
      console.error("Error fetching discussions:", error);
      setAlertInfo({
        message: "Failed to fetch discussions. Please try again.",
        type: "error",
        onClose: () => setAlertInfo(null),
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
        } else {
          rootComments.push(commentMap[comment.id]);
        }
      } else {
        rootComments.push(commentMap[comment.id]);
      }
    });

    return rootComments;
  };

  const handleCommentAction = async (
    action: "add" | "edit" | "delete",
    commentId?: string,
    message?: string,
    parentId?: string | null
  ) => {
    if (!checkUserLogin()) {
      setAlertInfo({
        message: "Please login first.",
        type: "warning",
        onClose: () => setAlertInfo(null),
      });
      return router.push("/auth/login");
    }

    if ((action === "add" || action === "edit") && !message?.trim()) {
      setAlertInfo({
        message: "Comment cannot be empty.",
        type: "error",
        onClose: () => setAlertInfo(null),
      });
      return;
    }

    try {
      const token = Cookies.get("token");
      let url = "${process.env.NEXT_PUBLIC_API_URL}/discussions";
      let method = "POST";
      let body: any = {
        message,
        id_replies_discussion: parentId,
        id_detail_masjid: detailMasjidId,
        id_user: currentUser?.id,
      };

      if (action === "edit") {
        url += `/${commentId}`;
        method = "PUT";
        body = { message };
      } else if (action === "delete") {
        url += `/${commentId}`;
        method = "DELETE";
        body = null;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} comment.`);

      const updatedComment = action !== "delete" ? await response.json() : null;

      if (action === "add") {
        const userInfo = await fetchUserInfo(currentUser!.id);
        updatedComment.user = userInfo;
        updatedComment.replies = []; // Initialize replies as an empty array
      }

      setComments((prevComments) => {
        const updateCommentTree = (comments: Comment[]): Comment[] => {
          return comments
            .map((c) => {
              if (action === "add" && c.id === parentId) {
                return {
                  ...c,
                  replies: [...(c.replies || []), updatedComment],
                };
              } else if (c.id === commentId) {
                return action === "delete" ? null : { ...c, ...updatedComment };
              } else if (c.replies && c.replies.length > 0) {
                return { ...c, replies: updateCommentTree(c.replies) };
              }
              return c;
            })
            .filter((c): c is Comment => c !== null);
        };

        if (action === "add" && !parentId) {
          return [...prevComments, updatedComment];
        }
        return updateCommentTree(prevComments);
      });

      if (action === "edit") setEditingComment(null);
      setNewComment("");
      setNewReplies((prev) => {
        const { [parentId || ""]: _, ...rest } = prev;
        return rest;
      });

      setAlertInfo({
        message: `Comment ${action}ed successfully`,
        type: "success",
        onClose: () => setAlertInfo(null),
      });
    } catch (error) {
      console.error(`Error ${action}ing comment:`, error);
      setAlertInfo({
        message: `Failed to ${action} comment. Please try again.`,
        type: "error",
        onClose: () => setAlertInfo(null),
      });
    }
  };

  const handleReply = async (parentId: string) => {
    const replyMessage = newReplies[parentId];
    if (!replyMessage?.trim()) {
      setAlertInfo({
        message: "Reply cannot be empty.",
        type: "error",
        onClose: () => setAlertInfo(null),
      });
      return;
    }

    try {
      await handleCommentAction("add", undefined, replyMessage, parentId);
    } catch (error) {
      console.error("Error adding reply:", error);
      setAlertInfo({
        message: "Failed to add reply. Please try again.",
        type: "error",
        onClose: () => setAlertInfo(null),
      });
    }
  };

  useEffect(() => {
    checkUserLogin();
    if (detailMasjidSlug) fetchComments();
  }, [detailMasjidSlug]);

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComment = (
    comment: Comment,
    depth = 0,
    parentUser: string | null = null
  ) => {
    const isCurrentUser = currentUser?.id === comment.id_user;
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedReplies[comment.id];

    const formatUserName = () => {
      if (depth > 2 && parentUser) {
        return `${parentUser} > ${comment.user?.name || "Anonymous"}`;
      }
      return comment.user?.name || "Anonymous";
    };

    return (
      <div key={comment.id} className={`mb-4 ${depth > 0 ? "ml-8" : ""}`}>
        <div className="flex items-start gap-2 flex-row">
          {depth === 1 && (
            <CornerDownRight className="h-4 w-4 text-gray-500 self-start mt-2" />
          )}
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={comment.user?.avatar || "/placeholder-avatar.jpg"}
            />
            <AvatarFallback>
              {comment.user?.name?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          <div
            className={`max-w-full md:max-w-[70%] ${
              isCurrentUser ? "bg-blue-100 text-black" : "bg-gray-200"
            } rounded-lg p-3`}
          >
            <div className="flex flex-col mb-1">
              <span className="font-semibold text-sm">{formatUserName()}</span>
              <span className="text-xs opacity-70">
                {new Date(comment.created_at).toLocaleString()}
              </span>
            </div>
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
                  className="w-full bg-white text-black"
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingComment(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      handleCommentAction(
                        "edit",
                        comment.id,
                        editingComment.message
                      )
                    }
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm">{comment.message}</p>
            )}
          </div>
          {isCurrentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
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
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleCommentAction("delete", comment.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="flex items-center mt-1 ml-10 space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setNewReplies((prev) => ({ ...prev, [comment.id]: "" }))
            }
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Reply
          </Button>
          {hasReplies && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleReplies(comment.id)}
            >
              {isExpanded ? (
                <ChevronUp className="mr-2 h-4 w-4" />
              ) : (
                <ChevronDown className="mr-2 h-4 w-4" />
              )}
              {isExpanded ? "Hide" : "Show"} {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "reply" : "replies"}
            </Button>
          )}
        </div>
        {newReplies[comment.id] !== undefined && (
          <div className="mt-2 space-y-2 ml-10">
            <Textarea
              placeholder="Write your reply..."
              value={newReplies[comment.id]}
              onChange={(e) =>
                setNewReplies((prev) => ({
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
                  setNewReplies((prev) => {
                    const { [comment.id]: _, ...rest } = prev;
                    return rest;
                  })
                }
              >
                Cancel
              </Button>
              <Button onClick={() => handleReply(comment.id)}>
                <Send className="mr-2 h-4 w-4" />
                Send Reply
              </Button>
            </div>
          </div>
        )}
        {hasReplies && isExpanded && (
          <div className="mt-2">
            {comment.replies.map((reply) =>
              renderComment(reply, depth + 1, comment.user?.name ?? null)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto sm:max-w-full">
      <CardHeader>
        <h2 className="text-2xl font-bold">Discussion</h2>
      </CardHeader>
      <CardContent>
        {alertInfo && (
          <AlertCustom
            message={alertInfo.message}
            type={alertInfo.type}
            onClose={alertInfo.onClose}
          />
        )}
        {isLoading ? (
          <p className="text-center">
            <Loading />
          </p>
        ) : comments.length > 0 ? (
          comments.map((comment) => renderComment(comment))
        ) : (
          <p className="text-center text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full"
          />
          <Button
            onClick={() =>
              handleCommentAction("add", undefined, newComment, null)
            }
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            Add Comment
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
