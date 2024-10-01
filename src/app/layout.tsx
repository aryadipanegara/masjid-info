import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Metadata } from "next";
import { AuthProvider } from "@/lib/AuthContext";
import NotificationBanner from "@/components/modal/NotificationModal";
import Providers from "@/redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Masjidinfo",
    template: "%s - Masjidinfo",
  },
  description:
    "Masjidinfo adalah platform terpercaya yang menyediakan informasi mendalam tentang masjid-masjid di Indonesia dan di seluruh dunia. Temukan sejarah, arsitektur, dan acara penting dari masjid-masjid terkenal. Dari masjid besar hingga yang tersembunyi, kami memberikan panduan lengkap bagi Anda untuk menjelajahi keindahan dan kebijaksanaan yang terkandung di dalamnya. Bergabunglah dengan komunitas kami untuk berbagi pengalaman dan pengetahuan tentang masjid-masjid yang memperkaya budaya dan spiritualitas umat.",
  keywords:
    "masjid, informasi masjid, sejarah masjid, arsitektur masjid, masjid di Indonesia",
  twitter: {
    card: "summary_large_image",
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
        {/* Basic SEO */}
        <meta
          name="description"
          content="Masjidinfo adalah platform terpercaya yang menyediakan informasi mendalam tentang masjid-masjid di Indonesia dan di seluruh dunia. Temukan sejarah, arsitektur, dan acara penting dari masjid-masjid terkenal."
        />
        <meta
          name="keywords"
          content="masjid, informasi masjid, sejarah masjid, arsitektur masjid, masjid di Indonesia"
        />
        <meta name="author" content="aryadipanegara" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph for Social Media */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Masjidinfo - Informasi Mendalam Tentang Masjid di Dunia"
        />
        <meta
          property="og:description"
          content="Masjidinfo adalah platform terpercaya yang menyediakan informasi mendalam tentang masjid-masjid di seluruh dunia."
        />

        <meta property="og:url" content="https://www.masjidinfo.my.id" />
        <meta property="og:site_name" content="Masjidinfo" />
        <meta property="og:locale" content="id_ID" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Masjidinfo - Informasi Mendalam Tentang Masjid di Dunia"
        />
        <meta
          name="twitter:description"
          content="Masjidinfo adalah platform terpercaya yang menyediakan informasi mendalam tentang masjid-masjid di seluruh dunia."
        />

        <meta name="twitter:site" content="@Masjidinfo" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.masjidinfo.my.id" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://www.masjidinfo.my.id",
              name: "Masjidinfo",
              author: {
                "@type": "Organization",
                name: "Masjidinfo",
              },
              description:
                "Masjidinfo adalah platform terpercaya yang menyediakan informasi mendalam tentang masjid-masjid di seluruh dunia.",
              inLanguage: "id_ID",
              publisher: {
                "@type": "Organization",
                name: "Masjidinfo",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <NotificationBanner />
          <Providers>
            <main>{children}</main>
          </Providers>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
