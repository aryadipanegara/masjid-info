import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { MdLogout } from "react-icons/md";

const NavbarWithSearch = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("email");
    setIsLoggedIn(!!userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    setIsLoggedIn(false);
  };

  React.useEffect(() => {
    const userLoggedIn = localStorage.getItem("email") !== null;
    setIsLoggedIn(userLoggedIn);
  }, [isLoggedIn]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="black"
        className={`flex items-center gap-x-2 p-1 font-medium rounded-md`}
      >
        <Link to="/home" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className={`flex items-center gap-x-2 p-1 font-medium rounded-md`}
      >
        <Link to="/artikel" className="flex items-center">
          Article
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className={`flex items-center gap-x-2 p-1 font-medium rounded-md`}
      >
        <Link to="/about" className="flex items-center">
          About
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900">
        <Typography
          as={Link}
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Masjid Info
        </Typography>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <FaSearch size={16} color="#CFD8DC" />
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

        <div className="hidden lg:flex">{navList}</div>

        <div className="hidden items-center gap-x-2 lg:flex">
          <SearchBar />
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow"
            >
              <MdLogout />
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded shadow"
            >
              SignIn
            </Link>
          )}
        </div>
      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarWithSearch;
