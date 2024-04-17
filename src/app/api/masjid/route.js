import { NextResponse } from "next/server";

async function fetchMasjid() {
  const response = await fetch("http://localhost:5000/articles");
  const masjids = await response.json();
  return masjids;
}

export async function GET(request) {
  const masjid = await fetchMasjid();
  return new NextResponse(JSON.stringify(masjid), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
