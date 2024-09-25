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

import { Masjid } from "@/types/masjidInterfaces";
import { CategoryList } from "@/components/CategoryList";

import { CalendarIcon, EyeIcon } from "lucide-react";
import Loading from "@/app/loading";

interface MasjidFinderClientProps {
  initialMasjids: Masjid[];
}

export default function MasjidFinderClient({
  initialMasjids,
}: MasjidFinderClientProps) {
  const [masjids, setMasjids] = useState<Masjid[]>(initialMasjids);
  const [filteredMasjids, setFilteredMasjids] =
    useState<Masjid[]>(initialMasjids);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    // Ekstrak kategori dari initialMasjids
    const uniqueCategories = Array.from(
      new Set(
        initialMasjids.flatMap((masjid: any) =>
          masjid.categories.map((cat: any) => JSON.stringify(cat.category))
        )
      )
    ).map((cat) => JSON.parse(cat as string) as { id: number; name: string });

    setCategories(uniqueCategories);
  }, [initialMasjids]);

  useEffect(() => {
    filterMasjids();
  }, [searchTerm, masjids, selectedCategory]);

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
                        href={`/detailmasjids/${masjid.detailMasjids[0]?.slug}`}
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
