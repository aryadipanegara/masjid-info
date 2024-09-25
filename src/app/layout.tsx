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
