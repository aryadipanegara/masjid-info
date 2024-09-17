import type { Metadata } from "next";

// Metadata untuk halaman utama
export function getMetadataForPage(pageName: string): Metadata {
  switch (pageName) {
    case "home":
      return {
        title: "Home - Masjid Info",
        description:
          "Explore the beauty and wisdom of mosques in Indonesia. Discover historical insights, architectural details, and stunning photos of various mosques across the country.",
        keywords:
          "masjid, info masjid, home, mosques, Indonesia, historical mosques, mosque architecture",
        openGraph: {
          title: "Home - Masjid Info",
          description:
            "Explore the beauty and wisdom of mosques in Indonesia. Discover historical insights, architectural details, and stunning photos.",
          url: "https://masjidinfo.vercel.app",
          siteName: "Masjid Info",
          images: [
            {
              url: "https://masjidinfo.vercel.app/home-banner.png",
              alt: "Home Banner",
              width: 1200,
              height: 630,
            },
          ],
          locale: "id_ID",
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: "Home - Masjid Info",
          description:
            "Explore the beauty and wisdom of mosques in Indonesia. Discover historical insights, architectural details, and stunning photos.",
          images: ["https://masjidinfo.vercel.app/home-banner.png"],
          site: "@MasjidInfo",
          creator: "@MasjidInfo",
        },
      };
    default:
      return {
        title: "Masjid Info",
        description:
          "Informasi lengkap tentang masjid-masjid di Indonesia. Temukan detail tentang sejarah, arsitektur, dan foto masjid-masjid dari seluruh Indonesia.",
        keywords:
          "masjid, info masjid, Indonesia, sejarah masjid, arsitektur masjid",
        openGraph: {
          title: "Masjid Info",
          description:
            "Informasi lengkap tentang masjid-masjid di Indonesia. Temukan detail tentang sejarah, arsitektur, dan foto masjid-masjid.",
          url: "https://masjidinfo.vercel.app",
          siteName: "Masjid Info",
          images: [
            {
              url: "https://masjidinfo.vercel.app/default-banner.png",
              alt: "Default Banner",
              width: 1200,
              height: 630,
            },
          ],
          locale: "id_ID",
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: "Masjid Info",
          description:
            "Informasi lengkap tentang masjid-masjid di Indonesia. Temukan detail tentang sejarah, arsitektur, dan foto masjid-masjid.",
          images: ["https://masjidinfo.vercel.app/default-banner.png"],
          site: "@MasjidInfo",
          creator: "@MasjidInfo",
        },
      };
  }
}

// Metadata untuk halaman detail masjid
export function getMetadataForMasjid(
  masjidName: string,
  description: string,
  photoUrl: string,
  masjidId: string
): Metadata {
  return {
    title: `${masjidName} - Masjid Info`,
    description: `${description}. Discover detailed insights, historical significance, and architectural beauty of ${masjidName}. Explore photos and learn more about this remarkable mosque.`,
    keywords: `masjid, ${masjidName}, info masjid, historical mosque, architectural beauty, ${masjidId}`,
    openGraph: {
      title: `${masjidName} - Masjid Info`,
      description: `${description}. Discover detailed insights, historical significance, and architectural beauty of ${masjidName}. Explore photos and learn more about this remarkable mosque.`,
      url: `https://masjidinfo.vercel.app/detailmasjids/${masjidId}`,
      siteName: "Masjid Info",
      images: [
        {
          url: photoUrl,
          alt: `${masjidName} photo`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "id_ID",
      type: "article",
      authors: ["Masjid Info Team"],
      tags: ["masjid", masjidName, "Indonesia", "history", "architecture"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${masjidName} - Masjid Info`,
      description: `${description}. Discover detailed insights, historical significance, and architectural beauty of ${masjidName}. Explore photos and learn more about this remarkable mosque.`,
      images: [photoUrl],
      site: "@MasjidInfo",
      creator: "@MasjidInfo",
    },
  };
}

export function getMetadataForHome(): Metadata {
  return {
    title: "Home - Masjid Info",
    description: "Explore the beauty and wisdom of mosques in Indonesia",
    keywords: "masjid, info masjid, home",
    openGraph: {
      title: "Home - Masjid Info",
      description: "Explore the beauty and wisdom of mosques in Indonesia",
      url: "https://masjidinfo.vercel.app",
      siteName: "Masjid Info",
      images: [
        {
          url: "/home-banner.png",
          alt: "Home Banner",
          width: 1200,
          height: 630,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Home - Masjid Info",
      description: "Explore the beauty and wisdom of mosques in Indonesia",
      images: ["/home-banner.png"],
    },
  };
}
