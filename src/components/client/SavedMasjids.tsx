"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Masjid } from "@/types/masjidInterfaces";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconCalendar,
  IconEye,
  IconHeart,
  IconBookmark,
} from "@tabler/icons-react";
import { useMasjid } from "@/redux/hooks/useMasjid";
import { ShareMediaButton } from "../ShareMediaButton";
import { ShareMediaModal } from "../modal/ShareMediaModal";
import Alert from "../ui/AlertCustom";

export default function SavedMasjids() {
  const {
    likedMasjids,
    bookmarkedMasjids,
    toggleLike,
    toggleBookmark,
    incrementViewCount,
    updateLastVisited,
    viewCounts,
    alert,
  } = useMasjid();
  const [allMasjids, setAllMasjids] = useState<Masjid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedMasjid, setSelectedMasjid] = useState<Masjid | null>(null);

  useEffect(() => {
    fetchAllMasjids();
  }, []);

  const fetchAllMasjids = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/masjids`
      );
      if (!response.ok) throw new Error("Failed to fetch masjid data");
      const masjids: Masjid[] = await response.json();
      setAllMasjids(masjids);
    } catch (error) {
      console.error("Error fetching masjids:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLikedMasjids = () =>
    allMasjids.filter((masjid) => likedMasjids.includes(masjid.id));
  const getBookmarkedMasjids = () =>
    allMasjids.filter((masjid) => bookmarkedMasjids.includes(masjid.id));

  const handleShareClick = (masjid: Masjid) => {
    setSelectedMasjid(masjid);
    setIsShareModalOpen(true);
  };

  const handleMasjidClick = (masjidId: string) => {
    incrementViewCount(masjidId);
    updateLastVisited(masjidId);
  };

  const MasjidCard = ({ masjid }: { masjid: Masjid }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative w-full pt-[56.25%]">
        <Image
          src={masjid.thumbnail}
          alt={masjid.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardHeader className="flex-grow">
        {masjid.categories && masjid.categories.length > 0 && (
          <span className="text-xs sm:text-sm font-medium text-emerald-600 mb-1 sm:mb-2 block">
            {masjid.categories[0].category.name}
          </span>
        )}
        <CardTitle className="text-base sm:text-lg line-clamp-1">
          {masjid.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
          {masjid.description}
        </p>
        <div className="flex items-center text-xs text-gray-500">
          <IconCalendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="mr-4">
            {new Date(masjid.created_at).toLocaleDateString()}
          </span>
          <IconEye className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
          <span>{viewCounts[masjid.id] || 0}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-grow"
          onClick={() => handleMasjidClick(masjid.id)}
        >
          <Link href={`/detailmasjids/${masjid.detailMasjids[0]?.slug}`}>
            Kunjungi Masjid
          </Link>
        </Button>
        <ShareMediaButton onClick={() => handleShareClick(masjid)} />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleLike(masjid.id)}
          className={likedMasjids.includes(masjid.id) ? "text-red-500" : ""}
        >
          <IconHeart className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleBookmark(masjid.id)}
          className={
            bookmarkedMasjids.includes(masjid.id) ? "text-blue-500" : ""
          }
        >
          <IconBookmark className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Saved Masjids
      </h1>
      <Tabs defaultValue="liked" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="liked">Liked Masjids</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked Masjids</TabsTrigger>
        </TabsList>
        <TabsContent value="liked">
          {getLikedMasjids().length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              You haven't liked any masjids yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <AnimatePresence>
                {getLikedMasjids().map((masjid) => (
                  <motion.div
                    key={masjid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MasjidCard masjid={masjid} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
        <TabsContent value="bookmarked">
          {getBookmarkedMasjids().length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              You haven't bookmarked any masjids yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <AnimatePresence>
                {getBookmarkedMasjids().map((masjid) => (
                  <motion.div
                    key={masjid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MasjidCard masjid={masjid} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
      {selectedMasjid && (
        <ShareMediaModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          masjidName={selectedMasjid.name}
          masjidSlug={selectedMasjid.detailMasjids[0]?.slug || ""}
        />
      )}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          duration={3000}
          onClose={() => {}}
        />
      )}
    </div>
  );
}
