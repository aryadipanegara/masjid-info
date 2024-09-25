"use client";
import CardDetail from "@/components/CardDetails";
import { DetailMasjid } from "@/types/masjidInterfaces";
import Head from "next/head";
import { useState } from "react";

export default function DetailMasjidClient({
  initialData,
}: {
  initialData: DetailMasjid;
}) {
  const [detailMasjid] = useState(initialData);

  if (!detailMasjid) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Masjid not found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{detailMasjid.name} - Masjid Info</title>
        <meta
          name="description"
          content={`Informasi tentang masjid ${detailMasjid.name}, terletak di ${detailMasjid.address}. Klik untuk melihat lebih lanjut.`}
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <CardDetail detailMasjid={detailMasjid} />
      </div>
    </div>
  );
}
