import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masjidinfo",
  description:
    "Masjidinfo adalah situs yang memberikan informasi tentang masjid-masjid di Indonesia dan diseluruh Dunia",
  metadataBase: new URL("https://www.masjidinfo.my.id"),
  openGraph: {
    type: "website",
    title: "Masjidinfo",
    description:
      "Masjidinfo adalah situs yang memberikan informasi tentang masjid-masjid di Indonesia dan diseluruh Dunia",
    url: "https://www.masjidinfo.my.id",
    siteName: "Masjidinfo",
    images: [
      {
        url: "/public/masjid.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Masjidinfo",
    description:
      "Masjidinfo adalah situs yang memberikan informasi tentang masjid-masjid di Indonesia dan diseluruh Dunia",
    images: ["/public/masjid.png"],
  },
};

export function generateMetadata() {
  return metadata;
}
