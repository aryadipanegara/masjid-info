import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import Script from "next/script";
import { getMetadataForPage } from "@/components/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = getMetadataForPage("masjidinfo");

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
