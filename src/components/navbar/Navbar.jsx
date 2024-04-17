import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";
import SearchInput from "../search/SearchInput";

export function NavbarDefault({ onLogout }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Periksa apakah email sudah tersimpan di local storage saat komponen dimuat
      const email = localStorage.getItem("email");
      setIsLoggedIn(!!email); // Set isLoggedIn menjadi true jika email ada di local storage
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("email");
      setIsLoggedIn(false); // Set isLoggedIn menjadi false saat logout
      onLogout(); // Panggil fungsi logout
    }
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-semibold"
      >
        <a href="/blog" className="flex items-center">
          Artikel
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-semibold"
      >
        <a href="/blog" className="flex items-center">
          About
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-bold"
        >
          Masjid Info
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <SearchInput />
        <div className="items-center gap-x-1 hidden lg:block">
          {isLoggedIn ? (
            <Button fullWidth variant="text" size="sm" onClick={handleLogout}>
              <span>Log Out</span>
            </Button>
          ) : (
            <div className="flex">
              <Link href="/login">
                <Button fullWidth variant="text" size="sm">
                  <span>Log In</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            {isLoggedIn ? (
              <Button
                className="hover:bg-red-500"
                fullWidth
                variant="text"
                size="sm"
                onClick={handleLogout}
              >
                <span>Log Out</span>
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button fullWidth variant="text" size="sm">
                    <span>Log In</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
