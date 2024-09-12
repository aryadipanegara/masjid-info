import type { Metadata } from "next";

export function getMetadataForPage(pageName: string): Metadata {
  switch (pageName) {
    case "home":
      return {
        title: "Home - Masjid Info",
        description: "Explore the beauty and wisdom of mosques in Indonesia",
        keywords: "masjid, info masjid, home",
        openGraph: {
          title: "Home - Masjid Info",
          description: "Explore the beauty and wisdom of mosques in Indonesia",
          url: "https://www.masjidinfo.com",
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
          images: ["https://www.masjidinfo.com/home-twitter-image.jpg"],
        },
      };
    // Tambahkan case untuk halaman lain jika diperlukan
    default:
      return {
        title: "Masjid Info",
        description: "Informasi lengkap tentang masjid-masjid di Indonesia",
        keywords: "masjid, info masjid",
        openGraph: {
          title: "Masjid Info",
          description: "Informasi lengkap tentang masjid-masjid di Indonesia",
          url: "https://www.masjidinfo.com",
          siteName: "Masjid Info",
          images: [
            {
              url: "/default-banner.png",
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
          description: "Informasi lengkap tentang masjid-masjid di Indonesia",
          images: ["https://www.masjidinfo.com/default-twitter-image.jpg"],
        },
      };
  }
}
