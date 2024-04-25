"use client";

import { NavbarDefault } from "@/components/navbar/Navbar";
import "./globals.css";

import { Footer } from "@/components/footer/Footer";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "../redux";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <html lang="en">
      <Provider store={store}>
        <body className="bg-white">
          <NavbarDefault isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
