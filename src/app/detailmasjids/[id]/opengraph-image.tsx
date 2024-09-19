import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Detail Masjid";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getDetailMasjid(id: string) {
  const res = await fetch(
    `https://masjidinfo-backend.vercel.app/api/detailmasjids/${id}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch masjid details");
  }
  return res.json();
}

export default async function Image({ params }: { params: { id: string } }) {
  const masjid = await getDetailMasjid(params.id);

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
        <h1 style={{ margin: 0 }}>{masjid.name}</h1>
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
