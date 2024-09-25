import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Metadata } from "next";
import { AuthProvider } from "@/lib/AuthContext";
import NotificationBanner from "@/components/modal/NotificationModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Masjidinfo",
    template: "%s - Masjidinfo",
  },
  description:
    "Masjidinfo adalah situs yang memberikan informasi tentang masjid-masjid di Indonesia dan diseluruh Dunia",
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
        <link rel="icon" href="masjid.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <NotificationBanner />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
