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
          background: "linear-gradient(to right, #f6d365 0%, #fda085 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#1a5fb4",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            padding: "40px 60px",
            borderRadius: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 60,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            {masjid.name}
          </h1>
          <p
            style={{
              fontSize: 30,
              fontWeight: 400,
              color: "#4a4a4a",
              margin: 0,
              marginBottom: 10,
            }}
          >
            {masjid.address}
          </p>
          <div
            style={{
              fontSize: 24,
              fontWeight: 300,
              color: "#666",
            }}
          >
            Kunjungi untuk informasi lebih lanjut
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
