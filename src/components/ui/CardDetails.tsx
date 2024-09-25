"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  EyeIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CameraIcon,
  InfoIcon,
} from "lucide-react";
import { DetailMasjid } from "@/types/masjidInterfaces";
import { motion } from "framer-motion";
import { useState } from "react";
import Commentar from "../Comments";

type CardDetailProps = {
  detailMasjid: DetailMasjid;
};

export default function Component({ detailMasjid }: CardDetailProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const getCardSizeClass = () => {
    if (imageSize.width > 800 || imageSize.height > 800) {
      return "w-full h-auto";
    } else if (imageSize.width > 800 || imageSize.height > 450) {
      return "w-full md:w-3/4 h-auto";
    } else {
      return "w-full md:w-2/3 h-auto";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-primary">
                {detailMasjid.name}
              </CardTitle>
              <CardDescription className="flex items-center justify-center text-sm sm:text-base lg:text-lg">
                <MapPinIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {detailMasjid.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  <EyeIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  {detailMasjid.total_klik}
                </Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  {new Date(detailMasjid.created_at).toLocaleDateString()}
                </Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  <ClockIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  {new Date(detailMasjid.updated_at).toLocaleDateString()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2 pt-5">
              <CardContent>
                <div className="pr-0 lg:pr-4">
                  {detailMasjid.sejarah.map((sejarah, index) => (
                    <motion.div
                      key={sejarah.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="mb-8"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-primary text-center">
                        {sejarah.title}
                      </h3>
                      {detailMasjid.photos[index] && (
                        <div className="mb-4">
                          <div
                            className={`rounded-lg overflow-hidden shadow-lg mx-auto ${getCardSizeClass()}`}
                          >
                            <Image
                              src={detailMasjid.photos[index].photo_url}
                              alt={detailMasjid.photos[index].caption}
                              width={800}
                              height={450}
                              className="w-full h-auto"
                              onLoadingComplete={(img) => {
                                setImageSize({
                                  width: img.naturalWidth,
                                  height: img.naturalHeight,
                                });
                              }}
                            />
                          </div>
                          <p className="text-xs sm:text-sm text-center mt-2 text-muted-foreground">
                            {detailMasjid.photos[index].caption}
                          </p>
                        </div>
                      )}
                      <div
                        className="text-justify leading-relaxed text-foreground prose max-w-none text-sm sm:text-base"
                        dangerouslySetInnerHTML={{ __html: sejarah.content }}
                      />
                      {index < detailMasjid.sejarah.length - 1 && (
                        <Separator className="my-8" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
                    <InfoIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Informasi Tambahan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                    Masjid ini memiliki sejarah yang panjang dan merupakan salah
                    satu bangunan yang memiliki nilai historis penting.
                    Lokasinya menjadikan masjid ini tempat yang sering
                    dikunjungi untuk beribadah dan kegiatan lainnya.
                    Arsitekturnya menggabungkan unsur tradisional dan modern,
                    menciptakan harmoni yang indah antara masa lalu dan masa
                    kini.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
                    <CameraIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Galeri Foto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
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
          <Commentar />
        </motion.div>
      </div>
    </div>
  );
}
