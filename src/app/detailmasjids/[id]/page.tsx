import { Suspense } from "react";
import { notFound } from "next/navigation";
import DetailMasjidClient from "./DetailMasjidClient";
import Loading from "@/app/loading";

export async function getDetailMasjid(id: string) {
  const res = await fetch(
    `https://masjidinfo-backend.vercel.app/api/detailmasjids/${id}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const detailMasjid = await getDetailMasjid(params.id);
  return {
    title: `${detailMasjid.name}`,
    description: `Informasi tentang masjid ${detailMasjid.name}, terletak di ${detailMasjid.address}. Klik untuk melihat lebih lanjut.`,
  };
}

export default async function DetailMasjidPage({
  params,
}: {
  params: { id: string };
}) {
  const detailMasjid = await getDetailMasjid(params.id);

  return (
    <Suspense fallback={<Loading />}>
      <DetailMasjidClient initialData={detailMasjid} />
    </Suspense>
  );
}
