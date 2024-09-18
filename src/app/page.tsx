"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, EyeIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Masjid } from "@/types/masjidInterfaces";
import Loading from "./loading";
import { CategoryList } from "@/components/CategoryList";

export default function Component() {
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [filteredMasjids, setFilteredMasjids] = useState<Masjid[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMasjids();
  }, [selectedCategory]);

  useEffect(() => {
    filterMasjids();
  }, [searchTerm, masjids, selectedCategory]);

  const fetchMasjids = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://masjidinfo-backend.vercel.app/api/masjids"
      );
      if (!response.ok) throw new Error("Failed to fetch masjid data");

      const data: Masjid[] = await response.json();

      // Sort data by total_klik in descending order
      const sortedMasjids = data.sort((a, b) => {
        const totalKlikA = a.detailMasjids.reduce(
          (acc, dm) => acc + dm.total_klik,
          0
        );
        const totalKlikB = b.detailMasjids.reduce(
          (acc, dm) => acc + dm.total_klik,
          0
        );
        return totalKlikB - totalKlikA;
      });

      setMasjids(sortedMasjids);
      setFilteredMasjids(sortedMasjids);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(
          data.flatMap((masjid) =>
            masjid.categories.map((cat) => JSON.stringify(cat.category))
          )
        )
      ).map((cat) => JSON.parse(cat));

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching masjid data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch masjid data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex flex-col items-center justify-center py-16 bg-white">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Temukan Masjid
        </h1>
        <p className="text-xl text-gray-600">
          Explore the Beauty and Wisdom of Mosques
        </p>
      </header>

      <main className="flex-grow container mx-auto px-4">
        <div className=" justify-center flex">
          <CategoryList
            categories={categories}
            onSelectCategory={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Large Card */}
              {filteredMasjids.length > 0 && (
                <div className="col-span-1 lg:col-span-1 md:col-span-2 sm:col-span-1">
                  <motion.div
                    key={filteredMasjids[0].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href={`/detailmasjids/${filteredMasjids[0].detailMasjids[0]?.id}`}
                      className="w-full"
                    >
                      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col relative bg-gradient-to-br from-blue-500 to-teal-500">
                        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] w-full justify-center">
                          <Image
                            src={filteredMasjids[0].thumbnail}
                            alt={filteredMasjids[0].name}
                            layout="fill"
                            objectFit="cover"
                            className="brightness-75"
                          />
                        </div>
                        <CardContent className="p-6 flex-grow flex flex-col justify-between bg-white bg-opacity-80 relative z-10">
                          {filteredMasjids[0].categories.length > 0 && (
                            <span className="text-sm font-medium text-emerald-500 mb-2 block">
                              {filteredMasjids[0].categories[0].category.name}
                            </span>
                          )}
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                              {filteredMasjids[0].name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                              {filteredMasjids[0].description.length > 100
                                ? `${filteredMasjids[0].description.slice(
                                    0,
                                    100
                                  )}...`
                                : filteredMasjids[0].description}
                            </p>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="mr-1 h-4 w-4" />
                            <span className="mr-4">
                              {new Date(
                                filteredMasjids[0].created_at
                              ).toLocaleDateString()}
                            </span>
                            <EyeIcon className="mr-1 h-4 w-4" />
                            <span>
                              {filteredMasjids[0].detailMasjids.reduce(
                                (acc, dm) => acc + dm.total_klik,
                                0
                              )}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                </div>
              )}

              {/* Four Smaller Cards */}
              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredMasjids.slice(1, 5).map((masjid) => (
                  <motion.div
                    key={masjid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href={`/detailmasjids/${masjid.detailMasjids[0]?.id}`}
                      className="w-full"
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                        <div className="relative h-64 w-full">
                          <Image
                            src={masjid.thumbnail}
                            alt={masjid.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <CardContent className="p-6 flex-grow flex flex-col justify-between">
                          {masjid.categories.length > 0 && (
                            <span className="text-sm font-medium text-emerald-500 mb-2 block">
                              {masjid.categories[0].category.name}
                            </span>
                          )}
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                              {masjid.name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                              {masjid.description.length > 100
                                ? `${masjid.description.slice(0, 100)}...`
                                : masjid.description}
                            </p>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="mr-1 h-4 w-4" />
                            <span className="mr-4">
                              {new Date(masjid.created_at).toLocaleDateString()}
                            </span>
                            <EyeIcon className="mr-1 h-4 w-4" />
                            <span>
                              {masjid.detailMasjids.reduce(
                                (acc, dm) => acc + dm.total_klik,
                                0
                              )}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Grid for Masjid Cards Exceeding 5 */}
            {filteredMasjids.length > 5 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredMasjids.slice(5).map((masjid) => (
                  <motion.div
                    key={masjid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href={`/detailmasjids/${masjid.detailMasjids[0]?.id}`}
                      className="w-full"
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                        <div className="relative h-64 w-full">
                          <Image
                            src={masjid.thumbnail}
                            alt={masjid.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <CardContent className="p-6 flex-grow flex flex-col justify-between">
                          {masjid.categories.length > 0 && (
                            <span className="text-sm font-medium text-emerald-500 mb-2 block">
                              {masjid.categories[0].category.name}
                            </span>
                          )}
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                              {masjid.name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                              {masjid.description.length > 100
                                ? `${masjid.description.slice(0, 100)}...`
                                : masjid.description}
                            </p>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="mr-1 h-4 w-4" />
                            <span className="mr-4">
                              {new Date(masjid.created_at).toLocaleDateString()}
                            </span>
                            <EyeIcon className="mr-1 h-4 w-4" />
                            <span>
                              {masjid.detailMasjids.reduce(
                                (acc, dm) => acc + dm.total_klik,
                                0
                              )}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
