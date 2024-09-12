"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarIcon, EyeIcon, SearchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Masjid } from "@/types/masjidInterfaces";
import Loading from "./loading";

export default function Component() {
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [filteredMasjids, setFilteredMasjids] = useState<Masjid[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMasjids();
  }, []);

  const fetchMasjids = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://masjidinfo-backend.vercel.app/api/masjids?limit=3"
      );
      if (!response.ok) throw new Error("Failed to fetch masjid data");
      const data = await response.json();
      setMasjids(data);
      setFilteredMasjids(data);
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

  useEffect(() => {
    const filtered = masjids.filter(
      (masjid) =>
        masjid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        masjid.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMasjids(filtered);
  }, [searchTerm, masjids]);

  return (
    <div className="min-h-screen bg-gradient-to-b bg-emerald-100 from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Temukan Masjid
          </h1>
          <p className="text-xl text-gray-600">
            Explore the Beauty and Wisdom of Mosques
          </p>
        </header>
        <div className="relative mb-12 max-w-md mx-auto">
          <Input
            type="search"
            placeholder="Search masjids..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMasjids.map((masjid) => (
              <motion.div
                key={masjid.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/detailmasjids/${masjid.detailMasjids[0]?.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={masjid.thumbnail}
                      alt={masjid.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {masjid.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-4">
                        {masjid.description.slice(0, 100)}...
                      </p>
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
                          )}{" "}
                          views
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
