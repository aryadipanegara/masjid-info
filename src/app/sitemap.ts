import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

  // Daftar URL statis
  const routes = ["", "masjid", "about", "profile", "privacy", "service"].map(
    (route) => ({
      url: `${baseUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })
  );

  // Tambahkan halaman beranda dengan prioritas lebih tinggi
  routes.unshift({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  });

  // Ambil daftar ID masjid dari API atau database Anda
  const masjidIds = await fetchMasjidIds(); // Implementasikan fungsi ini

  const detailMasjidRoutes = masjidIds.map((id) => ({
    url: `${baseUrl}/detailmasjid/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...detailMasjidRoutes];
}

// Fungsi untuk mengambil ID masjid (contoh implementasi)
async function fetchMasjidIds(): Promise<string[]> {
  // Implementasikan logika untuk mengambil ID masjid dari API atau database Anda
  // Contoh sederhana:
  return ["1", "2", "3"]; // Ganti dengan ID masjid yang sebenarnya
}
