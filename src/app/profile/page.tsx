import ProfilePage from "@/components/client/Profile";
export async function generateMetadata() {
  return {
    title: "Pengaturan Akun - Masjid Info",
    description: "Kelola informasi profil dan pengaturan akun Anda.",
  };
}

export default function Page() {
  return <ProfilePage />;
}
