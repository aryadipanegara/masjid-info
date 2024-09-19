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

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="200"
    viewBox="0 0 864 864"
    style={{ position: "absolute", top: "20px", left: "20px" }}
  >
    <g
      transform="translate(0.000000,864.000000) scale(0.100000,-0.100000)"
      fill="#1a5fb4"
      stroke="none"
    >
      <path d="M2475 5679 c-4 -6 -5 -12 -2 -15 2 -3 7 2 10 11 7 17 1 20 -8 4z" />
      <path d="M6243 5639 c213 -362 309 -663 339 -1052 33 -433 -82 -910 -314 -1297 -56 -93 -191 -276 -262 -355 -55 -60 -68 -54 -64 31 3 56 4 59 32 64 34 6 43 22 23 39 -10 8 -69 11 -198 9 -176 -3 -184 -4 -184 -23 0 -14 8 -21 28 -23 l27 -3 0 -105 0 -104 -49 0 -50 0 -3 53 -3 52 -95 5 -95 5 -3 68 -3 67 -129 0 c-88 0 -130 4 -130 11 0 6 19 33 43 59 56 62 103 151 122 231 17 76 19 207 4 281 -27 127 -128 263 -291 390 -211 164 -297 248 -340 332 -17 33 -19 52 -15 130 3 50 11 103 18 119 11 24 10 31 -9 57 -31 42 -29 78 6 90 15 6 36 15 47 20 18 9 17 10 -6 5 -36 -6 -93 11 -128 41 -57 48 -59 158 -3 217 38 40 5 35 -40 -6 -48 -44 -66 -102 -48 -159 14 -47 68 -105 102 -110 33 -4 38 -68 9 -97 -22 -22 -27 -51 -11 -67 5 -5 12 -52 16 -104 6 -85 4 -100 -14 -136 -37 -72 -181 -214 -335 -328 -65 -48 -168 -148 -206 -201 -20 -27 -50 -79 -66 -115 -28 -60 -30 -76 -33 -196 -3 -127 -3 -133 29 -215 31 -81 83 -163 128 -203 44 -40 30 -46 -109 -46 l-129 0 -3 -67 -3 -68 -95 0 -95 0 -3 74 c-3 80 2 91 49 91 30 0 45 25 28 46 -10 12 -60 14 -278 12 l-266 -3 0 -25 c0 -20 6 -26 30 -28 52 -6 55 -14 55 -154 l0 -129 -112 3 -113 3 1 420 c0 419 3 457 37 538 l16 37 -33 0 c-20 0 -36 6 -39 14 -3 8 -6 133 -7 277 0 238 1 265 19 303 10 22 21 52 24 66 2 14 12 42 21 63 l16 37 -60 0 c-50 0 -60 3 -61 18 0 9 0 98 1 196 1 137 5 186 16 208 13 26 13 32 -1 60 -21 42 -21 166 0 174 8 4 15 12 15 19 0 7 7 15 15 19 8 3 15 10 15 16 0 6 -54 10 -150 10 -96 0 -150 -4 -150 -10 0 -6 7 -13 15 -16 8 -4 15 -12 15 -20 0 -8 7 -14 15 -14 8 0 18 -12 21 -26 4 -16 9 -22 14 -14 4 6 18 10 31 8 22 -3 24 -8 27 -62 l3 -58 -34 4 c-59 7 -90 -46 -57 -97 18 -27 20 -47 20 -207 0 -97 -3 -183 -6 -192 -5 -12 -20 -16 -60 -16 -30 0 -54 -4 -54 -9 0 -5 7 -25 15 -44 8 -20 15 -46 15 -58 0 -11 9 -34 20 -49 19 -27 20 -42 18 -312 l-3 -283 -32 -3 c-38 -4 -37 0 -17 -66 9 -28 20 -65 25 -82 13 -44 12 -751 -1 -759 -12 -7 -66 51 -149 159 -239 313 -391 671 -448 1053 -23 161 -23 465 0 628 43 290 150 594 297 843 18 28 29 52 27 52 -19 0 -182 -244 -256 -383 -277 -515 -357 -1154 -216 -1726 153 -616 514 -1123 1051 -1473 722 -471 1677 -512 2443 -106 680 359 1139 991 1271 1748 105 600 -31 1247 -369 1755 -71 107 -177 242 -138 174z m-3275 -492 c-3 -50 -4 -52 -33 -52 -29 0 -30 2 -33 50 -4 57 16 82 50 64 16 -8 18 -19 16 -62z" />
      <path d="M2828 5593 c-84 -87 -108 -152 -74 -199 8 -10 12 -29 9 -41 -5 -23 -5 -23 127 -23 132 0 132 0 127 23 -3 12 1 31 9 41 17 24 18 79 3 109 -12 23 -129 147 -139 147 -3 0 -31 -26 -62 -57z" />
      <path d="M4648 4969 c-20 -21 -13 -63 10 -54 8 3 22 0 30 -7 13 -11 15 -10 9 6 -4 10 -3 24 2 30 6 7 2 16 -12 27 -20 14 -23 14 -39 -2z" />
      <path d="M3442 4147 c-8 -9 -8 -31 0 -79 11 -64 11 -68 -15 -106 -14 -22 -66 -73 -114 -112 -154 -126 -182 -171 -183 -283 0 -53 6 -81 26 -123 23 -49 40 -67 124 -134 l25 -19 -31 -1 c-39 0 -67 -21 -62 -46 3 -18 15 -19 244 -22 209 -2 243 0 248 13 10 27 -5 45 -45 51 -46 8 -49 18 -11 38 42 22 108 97 123 142 17 50 17 148 0 198 -17 49 -66 103 -160 178 -40 32 -89 77 -108 100 -34 41 -34 42 -31 126 3 85 -6 108 -30 79z" />
      <path d="M5799 3788 c-1 -7 0 -38 1 -69 2 -63 -1 -67 -124 -173 -107 -93 -130 -169 -81 -266 15 -29 40 -60 60 -73 42 -27 45 -45 8 -49 -17 -2 -28 -9 -28 -18 0 -13 27 -15 173 -18 167 -2 172 -2 172 18 0 15 -7 20 -24 20 -37 0 -40 17 -9 37 65 41 92 93 93 172 0 82 -17 110 -119 195 -103 86 -113 102 -105 169 4 36 3 57 -5 61 -6 4 -12 1 -12 -6z" />
    </g>
  </svg>
);

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
        <Logo />
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
