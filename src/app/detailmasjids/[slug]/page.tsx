import { Suspense } from "react";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import DetailMasjidClient from "@/components/client/DetailMasjidClient";

async function getDetailMasjid(slug: string) {
  const res = await fetch(
    `https://masjidinfo-backend.vercel.app/api/detailmasjids/slug/${slug}`,
    {
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!res.ok) {
    console.error("Error fetching data:", res.status, res.statusText);
    notFound();
  }

  const data = await res.json();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const detailMasjid = await getDetailMasjid(params.slug);
  return {
    title: `${detailMasjid.name}`,
    description: `Informasi tentang masjid ${detailMasjid.name}, terletak di ${detailMasjid.address}. Klik untuk melihat lebih lanjut.`,
  };
}

export default async function DetailMasjidPage({
  params,
}: {
  params: { slug: string };
}) {
  const detailMasjid = await getDetailMasjid(params.slug);

  return (
    <Suspense fallback={<Loading />}>
      <DetailMasjidClient initialData={detailMasjid} />
    </Suspense>
  );
}
