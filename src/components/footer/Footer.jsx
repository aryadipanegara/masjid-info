import { Typography } from "@material-tailwind/react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full flex flex-col md:flex-row items-center justify-between bg-white text-gray-900 p-4 border">
      <Typography color="gray" className="text-lg font-semibold">
        &copy; 2024 Masjid Info
      </Typography>
      <ul className="flex flex-wrap items-center justify-center mt-2 md:mt-0">
        <li>
          <Typography
            as="a"
            href="#"
            color="gray"
            className="text-sm font-medium transition-colors hover:text-blue-300 focus:text-blue-300"
          >
            About Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
