"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpenIcon,
  MapPinIcon,
  CalendarIcon,
  EyeIcon,
  ClockIcon,
  MessageSquareIcon,
  InfoIcon,
  CameraIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/loading";
import { DetailMasjid } from "@/types/masjidInterfaces";

export default function DetailMasjidPage() {
  const [detailMasjid, setDetailMasjid] = useState<DetailMasjid | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchDetailMasjid(id as string);
    }
  }, [id]);

  const fetchDetailMasjid = async (detailMasjidId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://masjidinfo-backend.vercel.app/api/detailmasjids/${detailMasjidId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch masjid details");
      }
      const data = await response.json();
      setDetailMasjid(data);
    } catch (error) {
      console.error("Error fetching masjid details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch masjid details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!detailMasjid) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <BookOpenIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Masjid not found
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-primary">
              {detailMasjid.name}
            </CardTitle>
            <CardDescription className="flex items-center justify-center text-lg">
              <MapPinIcon className="mr-2 h-5 w-5" />
              {detailMasjid.address}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                <EyeIcon className="mr-1 h-4 w-4" />
                {detailMasjid.total_klik} views
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <CalendarIcon className="mr-1 h-4 w-4" />
                Created:{" "}
                {new Date(detailMasjid.created_at).toLocaleDateString()}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <ClockIcon className="mr-1 h-4 w-4" />
                Updated:{" "}
                {new Date(detailMasjid.updated_at).toLocaleDateString()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <BookOpenIcon className="mr-2 h-6 w-6 text-primary" />
                History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                {detailMasjid.sejarah.map((sejarah, index) => (
                  <motion.div
                    key={sejarah.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-primary">
                      {sejarah.title}
                    </h3>
                    {detailMasjid.photos[index] && (
                      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg mb-4">
                        <Image
                          src={detailMasjid.photos[index].photo_url}
                          alt={detailMasjid.photos[index].caption}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-center w-full py-2">
                          <p className="text-sm">
                            {detailMasjid.photos[index].caption}
                          </p>
                        </div>
                      </div>
                    )}
                    <div
                      className="text-base leading-relaxed text-foreground prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: sejarah.content }}
                    />
                    {index < detailMasjid.sejarah.length - 1 && (
                      <Separator className="my-8" />
                    )}
                  </motion.div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <InfoIcon className="mr-2 h-5 w-5 text-primary" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground">
                  This mosque has a long history and is one of the historic
                  buildings in the city. Located in the city center, this mosque
                  is often a destination for religious tourism for visitors. The
                  architecture of this mosque combines traditional elements with
                  modern touches, creating a beautiful harmony between the past
                  and the present.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <CameraIcon className="mr-2 h-5 w-5 text-primary" />
                  Photo Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {detailMasjid.photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="relative aspect-square rounded-md overflow-hidden"
                    >
                      <Image
                        src={photo.photo_url}
                        alt={photo.caption}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <MessageSquareIcon className="mr-2 h-6 w-6 text-primary" />
              Discussions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {detailMasjid.discussions.length > 0 ? (
              <ScrollArea className="h-[400px] pr-4">
                {detailMasjid.discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mb-6 p-4 bg-secondary/10 rounded-lg"
                  >
                    <div className="flex items-center mb-3">
                      <Avatar className="mr-3 h-10 w-10">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=User${
                            index + 1
                          }`}
                        />
                        <AvatarFallback>U{index + 1}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">
                          User {index + 1}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(discussion.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {discussion.message}
                    </p>
                  </motion.div>
                ))}
              </ScrollArea>
            ) : (
              <p className="text-lg text-muted-foreground text-center py-8">
                No discussions yet. Be the first to comment!
              </p>
            )}
            <Button className="w-full mt-4">Add Comment</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
