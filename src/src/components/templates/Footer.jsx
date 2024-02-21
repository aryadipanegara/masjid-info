/* eslint-disable react/no-unknown-property */
import { Typography } from "@material-tailwind/react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const currentYear = new Date().getFullYear();

const FooterLinks = () => {
  return (
    <footer className="relative w-full bottom-0">
      <div className=" py-2">
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between bottom-0">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0 px-5"
          >
            &copy; {currentYear} <a href="/">Masjid info</a>. All Rights
            Reserved.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center px-5">
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaFacebook size={20} />
            </Typography>
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaTwitter size={20} />
            </Typography>
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaInstagram size={20} />
            </Typography>
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaLinkedin size={20} />
            </Typography>
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaYoutube size={20} />
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLinks;
