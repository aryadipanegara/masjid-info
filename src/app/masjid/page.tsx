import AllMosque from "@/app/masjid/AllMosque";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Semua Masjid ",
  description:
    "Explore all mosques in our database. Search, filter, and discover mosques near you.",
};

export default function SemuaMasjidPage() {
  return <AllMosque />;
}
