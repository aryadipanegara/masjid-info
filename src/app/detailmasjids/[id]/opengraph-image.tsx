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
          background: "#1E88E5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          padding: "40px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle, #2196F3 10%, transparent 10%)",
            backgroundSize: "30px 30px",
            opacity: 0.2,
          }}
        />

        {/* Main content */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "90%",
          }}
        >
          {/* Mosque icon */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="white"
            style={{ marginBottom: "20px" }}
          >
            <path d="M17 6.1C17 4.8 16.2 3.6 15 3.2V2h-1v1.1C12.8 3.5 12 4.7 12 6.1c0 1.4-2 2.9-2 2.9h9S17 7.5 17 6.1zM12 14h-1v-3H7v10h2v-4h2v4h2v-5h4v5h2V11h-7v3zm0-6s1-1.4 1-2.1c0-.7-.5-1.4-1-1.8-.5.4-1 1.1-1 1.8C11 6.6 12 8 12 8z" />
          </svg>

          <h1
            style={{
              margin: 0,
              fontSize: "56px",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {masjid.name}
          </h1>
          <p style={{ fontSize: "28px", margin: "20px 0", fontWeight: "300" }}>
            {masjid.address}
          </p>
          <div
            style={{
              fontSize: "24px",
              color: "#E0E0E0",
              marginTop: "30px",
              borderTop: "2px solid rgba(255, 255, 255, 0.3)",
              paddingTop: "20px",
            }}
          >
            Informasi Masjid Terbaru
          </div>
        </div>

        {/* Watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            fontSize: "18px",
            opacity: 0.7,
          }}
        >
          masjidinfo.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
