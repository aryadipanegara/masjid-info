// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Fungsi untuk mendekode token JWT
const decodeJwt = (token: string) => {
  const payload = token.split(".")[1];
  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
  return JSON.parse(decodedPayload);
};

export function middleware(request: NextRequest) {
  // Ambil token dari cookies atau localStorage
  const token =
    request.cookies.get("token")?.value || localStorage.getItem("token");

  // Jika tidak ada token, redirect ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Decode token untuk mendapatkan role
    const decodedToken = decodeJwt(token);
    const userRole = decodedToken.role;

    // Jika user mencoba mengakses halaman admin tanpa role admin atau author
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      userRole !== "ADMIN" &&
      userRole !== ""
    ) {
      return new NextResponse("Akses Ditolak: Anda bukan Admin atau Author", {
        status: 403,
      });
    }
  } catch (error) {
    // Jika token invalid atau ada error, redirect ke login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Tentukan routes yang ingin diproteksi
export const config = {
  matcher: ["/admin/:path*"], // Middleware hanya berlaku untuk halaman admin
};
