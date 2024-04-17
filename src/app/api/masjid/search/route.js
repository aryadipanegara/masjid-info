import { NextResponse } from "next/server";

async function fetchMasjid(name) {
  const response = await fetch(
    `http://localhost:5000/articles/search?name=${name}`
  );
  const masjids = await response.json();
  return masjids;
}

export async function GET(request) {
  const name = request.query.name || "";
  const masjid = await fetchMasjid(name);
  return new NextResponse(JSON.stringify(masjid), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
