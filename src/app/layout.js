"use client";

import { NavbarDefault } from "@/components/navbar/Navbar";
import "./globals.css";

import { Footer } from "@/components/footer/Footer";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <html lang="en">
      <body>
        <NavbarDefault isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
