import { Suspense } from "react";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import DetailMasjidClient from "@/components/client/DetailMasjidClient";

async function getDetailMasjid(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailmasjids/slug/${slug}`,
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
    title: `${detailMasjid.name} - Temukan Sejarah dan Keindahan Masjid Ini `,
    description: `Selamat datang di halaman detail Masjid ${detailMasjid.name}. Terletak di ${detailMasjid.address}, masjid ini adalah salah satu permata arsitektur yang mengagumkan. Bergabunglah dengan kami untuk menjelajahi sejarah, keindahan arsitektur, dan pengalaman unik yang ditawarkan oleh masjid ini. Klik untuk mendapatkan informasi lebih lanjut tentang kegiatan, fasilitas, dan nilai budaya yang ada di ${detailMasjid.name}.`,
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
