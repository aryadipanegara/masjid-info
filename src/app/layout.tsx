import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Masjidinfo",
  description: "Informasi lengkap tentang masjid-masjid di Indonesia",
  keywords: "masjid, info masjid, jadwal sholat, kegiatan masjid",
  authors: [{ name: "aryadipanegara" }],
  openGraph: {
    title: "Masjid Info",
    description: "Informasi lengkap tentang masjid-masjid di Indonesia",
    url: "https://www.masjidinfo.com",
    siteName: "Masjid Info",
    images: [
      {
        url: "/masjid.png",
        alt: "Masjid Info",
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
    images: ["https://www.masjidinfo.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="masjid.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Masjid Info",
              "url": "https://www.masjidinfo.com"
            }
          `}
        </Script>
      </body>
    </html>
  );
}
