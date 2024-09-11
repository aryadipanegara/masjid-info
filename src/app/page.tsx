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
import { CalendarIcon, EyeIcon, MapPinIcon, SearchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Loading from "./loading";

interface Masjid {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  totalKliks: number;
  created_at: string;
  detailMasjids: { id: string }[];
}

export default function HomePage() {
  const [featuredMasjids, setFeaturedMasjids] = useState<Masjid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedMasjids();
  }, []);

  const fetchFeaturedMasjids = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://masjidinfo-backend.vercel.app/api/masjids?limit=3"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch featured mosques");
      }
      const data = await response.json();
      setFeaturedMasjids(data);
    } catch (error) {
      console.error("Error fetching featured mosques:", error);
      toast({
        title: "Error",
        description: "Failed to fetch featured mosques. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className=" text-black py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover the Beauty of Mosques
        </h1>
        <p className="text-xl mb-8">
          Explore Islamic architecture and spirituality
        </p>
        <div className="max-w-md mx-auto flex">
          <Input
            type="search"
            placeholder="Search for mosques..."
            className="flex-grow"
          />
          <Button className="ml-2 bg-white text-green-600 hover:bg-green-100">
            <SearchIcon className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Featured Mosques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              <Loading />
            ) : (
              featuredMasjids.map((masjid) => (
                <motion.div
                  key={masjid.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <Image
                      src={masjid.thumbnail}
                      alt={masjid.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle>{masjid.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">
                        {masjid.description.slice(0, 100)}...
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPinIcon className="mr-1 h-4 w-4" />
                        <span className="mr-4">Location</span>
                        <EyeIcon className="mr-1 h-4 w-4" />
                        <span>{masjid.totalKliks} views</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        {masjid.detailMasjids.map((detailMasjid) => (
                          <Link href={`/detailmasjids/${detailMasjid.id}`}>
                            Lihat detail
                          </Link>
                        ))}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/masjid">View All Mosques</Link>
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Historical", "Modern", "Largest", "Unique"].map((category) => (
              <Button key={category} variant="outline" className="h-24 text-lg">
                {category} Mosques
              </Button>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="mb-8">
            Stay updated with the latest mosque news and events
          </p>
          <div className="flex max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow"
            />
            <Button className="ml-2">Subscribe</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
