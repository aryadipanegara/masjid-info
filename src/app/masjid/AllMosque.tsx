"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card as UiCard,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconBookmark,
  IconCalendar,
  IconEye,
  IconHeart,
  IconSearch,
} from "@tabler/icons-react";
import { Masjid } from "@/types/masjidInterfaces";
import { CategoryList } from "@/components/CategoryList";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Loading from "@/app/loading";
import { ShareMediaButton } from "../../components/ShareMediaButton";
import { ShareMediaModal } from "../../components/modal/ShareMediaModal";
import { toggleBookmark, toggleLike } from "@/redux/slice/masjidSlice";
import { useMasjid } from "@/redux/hooks/useMasjid";
import Alert from "@/components/ui/AlertCustom";
import AllMosqueSkeleton from "@/components/skeleton/SkeletonAllMosque";

export default function AllMosque() {
  const {
    likedMasjids,
    bookmarkedMasjids,
    viewCounts,
    lastVisited,
    toggleLike,
    toggleBookmark,
    incrementViewCount,
    updateLastVisited,
    alert,
  } = useMasjid();
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [filteredMasjids, setFilteredMasjids] = useState<Masjid[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedMasjid, setSelectedMasjid] = useState<Masjid | null>(null);
  const placeholders = masjids.slice(0, 10).map((masjid) => masjid.name);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMasjids();
  }, [searchTerm, masjids, selectedCategory]);

  useEffect(() => {
    filterMasjids();
  }, [searchTerm, masjids, selectedCategory]);

  const fetchMasjids = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/masjids`
      );
      if (!response.ok) throw new Error("Failed to fetch masjid data");

      const data = await response.json();

      setMasjids(data);

      const uniqueCategories = Array.from(
        new Set(
          data.flatMap((masjid: any) =>
            masjid.categories.map((cat: any) => JSON.stringify(cat.category))
          )
        )
      ).map((cat) => JSON.parse(cat as string) as { id: number; name: string });

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching masjid data:", error);
    }
    // finally {
    //   setIsLoading(false);
    // }

    if (isLoading) {
      return <AllMosqueSkeleton />;
    }
  };

  const filterMasjids = () => {
    let filtered = masjids;

    if (searchTerm) {
      filtered = filtered.filter(
        (masjid) =>
          masjid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          masjid.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== null) {
      filtered = filtered.filter((masjid) =>
        masjid.categories.some((cat) => cat.category.id === selectedCategory)
      );
    }

    setFilteredMasjids(filtered);
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterMasjids();
  };

  const handleLikeClick = (masjidId: string) => {
    toggleLike(masjidId);
  };

  const handleBookmarkClick = (masjidId: string) => {
    toggleBookmark(masjidId);
  };

  const handleShareClick = (masjid: Masjid) => {
    setSelectedMasjid(masjid);
    setIsShareModalOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <AllMosqueSkeleton />
      ) : (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
              Semua Masjid
            </h1>

            <div className="mb-8">
              <div className="max-w-2xl mx-auto">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleSearchChange}
                  onSubmit={handleSearchSubmit}
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Kategori
              </h2>
              <CategoryList
                categories={categories}
                onSelectCategory={handleCategorySelect}
                selectedCategory={selectedCategory}
              />
            </div>

            {/* Masjid List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              <AnimatePresence>
                {filteredMasjids.map((masjid) => (
                  <motion.div
                    key={masjid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <UiCard className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
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
                          <span className="text-xs font-medium text-emerald-600 mb-2 block">
                            {masjid.categories[0].category.name}
                          </span>
                        )}
                        <CardTitle className="text-lg sm:text-xl line-clamp-1">
                          {masjid.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {masjid.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <IconCalendar className="mr-1 h-3 w-3" />
                          <span className="mr-4">
                            {new Date(masjid.created_at).toLocaleDateString()}
                          </span>
                          <IconEye className="mr-1 h-3 w-3" />
                          <span>
                            {masjid.detailMasjids.reduce(
                              (acc, dm) => acc + dm.total_klik,
                              0
                            )}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-grow"
                        >
                          <Link
                            href={`/detailmasjids/${masjid.detailMasjids[0]?.slug}`}
                          >
                            Kunjungi Masjid
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeClick(masjid.id)}
                          className={
                            likedMasjids.includes(masjid.id)
                              ? "text-red-500"
                              : ""
                          }
                        >
                          <IconHeart className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmarkClick(masjid.id)}
                          className={
                            bookmarkedMasjids.includes(masjid.id)
                              ? "text-yellow-500"
                              : ""
                          }
                        >
                          <IconBookmark className="h-4 w-4" />
                        </Button>
                        <ShareMediaButton
                          onClick={() => handleShareClick(masjid)}
                        />
                      </CardFooter>
                    </UiCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        </div>
      )}
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
    </>
  );
}
