import { Suspense } from "react";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import MasjidFinderClient from "@/components/client/MasjidFinderClient";

async function getMasjids() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/masjids`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  if (!res.ok) {
    console.error("Error fetching masjid data:", res.status, res.statusText);
    notFound();
  }

  const data = await res.json();
  return data;
}

export async function generateMetadata() {
  const masjids = await getMasjids();
  return {
    title: "Temukan Masjid",
    description: "Menjelajahi Keindahan dan Kebijaksanaan Masjid",
  };
}

export default async function MasjidFinderPage() {
  const masjids = await getMasjids();

  return (
    <Suspense fallback={<Loading />}>
      <MasjidFinderClient initialMasjids={masjids} />
    </Suspense>
  );
}
