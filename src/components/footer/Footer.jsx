import { Typography } from "@material-tailwind/react";

export function Footer() {
  return (
    <footer className="absolute  w-full flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50  text-center md:justify-between p-2">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2024 Masjid Info
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
