"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface User {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
}

interface Reply {
  id: string;
  message: string;
  created_at: string;
  user: User;
}

interface Comment {
  id: string;
  message: string;
  created_at: string;
  updated_at: string;
  id_replies_discussion: string | null;
  id_user: string;
  id_detail_masjid: string;
  user: User;
  replies: Reply[];
}

interface CommentSectionProps {
  comments: Comment[];
  user: string;
  onCommentsUpdated: (updatedComments: Comment[]) => void;
  detailMasjidId: string;
}

export default function CommentSection({
  comments,
  user,
  onCommentsUpdated,
  detailMasjidId,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAddComment = async () => {
    if (!user || !newComment.trim()) return;

    try {
      const response = await fetch(
        `/api/detailmasjids/${detailMasjidId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: newComment, userId: user }),
        }
      );

      if (response.ok) {
        const updatedComments = await response.json();
        onCommentsUpdated(updatedComments);
        setNewComment("");
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddReply = async (commentId: string) => {
    if (!user || !replyContent.trim()) return;

    try {
      const response = await fetch(
        `/api/detailmasjids/${detailMasjidId}/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: replyContent, userId: user }),
        }
      );

      if (response.ok) {
        const updatedComments = await response.json();
        onCommentsUpdated(updatedComments);
        setReplyingTo(null);
        setReplyContent("");
      } else {
        console.error("Failed to add reply");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[400px] pr-4">
        {comments &&
          comments.map((comment) => (
            <Card key={comment.id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={comment.user.avatar || undefined}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>
                      {comment.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{comment.user.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="mt-1">{comment.message}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(comment.id)}
                      className="mt-2"
                    >
                      Reply
                    </Button>
                    {replyingTo === comment.id && (
                      <div className="mt-2 space-y-2">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write a reply..."
                        />
                        <Button onClick={() => handleAddReply(comment.id)}>
                          Post Reply
                        </Button>
                      </div>
                    )}
                    {comment.replies.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex items-start space-x-4"
                          >
                            <Avatar>
                              <AvatarImage
                                src={reply.user.avatar || undefined}
                                alt={reply.user.name}
                              />
                              <AvatarFallback>
                                {reply.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h5 className="font-semibold">
                                  {reply.user.name}
                                </h5>
                                <span className="text-sm text-muted-foreground">
                                  {formatDistanceToNow(
                                    new Date(reply.created_at),
                                    { addSuffix: true }
                                  )}
                                </span>
                              </div>
                              <p className="mt-1">{reply.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </ScrollArea>
      {user && (
        <div className="mt-4 space-y-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button onClick={handleAddComment}>Post Comment</Button>
        </div>
      )}
    </div>
  );
}
