"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, EyeIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Masjid } from "@/types/masjidInterfaces";
import { CategoryList } from "@/components/CategoryList";
import Loading from "../loading";

export default function MasjidFinder() {
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
  }, []);

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

      const data = await response.json();

      setMasjids(data);

      // Extract unique categories
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Temukan Masjid
          </h1>
          <p className="text-xl text-muted-foreground">
            Menjelajahi Keindahan dan Kebijaksanaan Masjid
          </p>
        </header>

        <div className="mb-8">
          <Input
            type="search"
            placeholder="Cari masjid..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        <CategoryList
          categories={categories}
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <Loading />
          ) : (
            filteredMasjids.map((masjid) => (
              <motion.div
                key={masjid.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden">
                  <Image
                    src={masjid.thumbnail}
                    alt={masjid.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />

                  <CardHeader>
                    {masjid.categories && masjid.categories.length > 0 && (
                      <span className="text-sm font-medium text-emerald-500 mb-2 block">
                        {masjid.categories[0].category.name}
                      </span>
                    )}
                    <CardTitle>{masjid.name.slice(0, 35)}...</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {masjid.description.slice(0, 100)}...
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
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
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      <Link
                        href={`/detailmasjids/${masjid.detailMasjids[0]?.id}`}
                      >
                        Lihat detail
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
