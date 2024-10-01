import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Detail Masjid";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Mengganti dari id menjadi slug
async function getDetailMasjid(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailmasjids/slug/${slug}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch masjid details");
  }
  return res.json();
}

export default async function Image({ params }: { params: { slug: string } }) {
  const masjid = await getDetailMasjid(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
      >
        <h1 style={{ margin: 0, textAlign: "center" }}>{masjid.name}</h1>
        <p style={{ fontSize: 24, margin: "20px 0" }}>{masjid.address}</p>
        <div style={{ fontSize: 18, color: "#666" }}>
          Kunjungi untuk informasi lebih lanjut
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
