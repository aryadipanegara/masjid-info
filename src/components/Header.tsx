"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Search, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { useAuth } from "@/lib/AuthContext";
import { motion } from "framer-motion";

const navItems = [
  { href: "/masjid", label: "Masjid" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { userRole, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setIsDialogOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsDialogOpen(false);
  };

  const cancelLogout = () => {
    setIsDialogOpen(false);
  };

  const adminNavItems =
    userRole === "ADMIN" || userRole === "AUTHOR"
      ? [{ href: "/admin/dashboard", label: "Manage" }]
      : [];

  const AuthButtons = () => {
    if (userRole) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage alt="@username" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Link href="/profile" className="flex w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/setting" className="flex w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
        <>
          <Link href="/auth/login">
            <Button variant="ghost" className="text-black">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-white text-black hover:text-white hover:bg-emerald-700">
              Register
            </Button>
          </Link>
        </>
      );
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full py-3 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-emerald-800/60 shadow-md"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold mr-6 text-black">
              MasjidInfo
            </Link>
            <nav className="hidden lg:flex space-x-1">
              {navItems.concat(adminNavItems).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-emerald-200 text-black px-3 py-2 rounded-md hover:bg-emerald-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-black hover:text-emerald-200"
                >
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Dalam Tahap Pengembangan</DropdownMenuItem>
                {/* <DropdownMenuItem>
                  Event reminder: Eid celebration
                </DropdownMenuItem>
                <DropdownMenuItem>
                  New mosque added in your area
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
            <AuthButtons />
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="lg:hidden text-black"
                size="icon"
                aria-label="Toggle Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-white"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-2xl font-bold text-black">
                  MasjidInfo
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-black"
                ></Button>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.concat(adminNavItems).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-emerald-200 text-black px-3 py-2 rounded-md hover:bg-emerald-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <AuthButtons />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isSearchOpen ? "auto" : 0,
          opacity: isSearchOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {isSearchOpen && <div className="py-4"></div>}
      </motion.div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
      />
    </header>
  );
}
