/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";

const categoriesData = [
  { country: "Arabia" },
  { country: "Brunei" },
  { country: "Indonesia" },
  { country: "Malaysia" },
];

export default function Category({ active, onClick }) {
  return (
    <div className="flex flex-wrap">
      {categoriesData.map((data, index) => (
        <div
          key={index}
          className={`cursor-pointer px-4 py-2 rounded-xl max-h-10 inline-block mb-2 mr-2 font-semibold
          ${
            active === data.country
              ? "bg-black text-white"
              : "bg-gray-200 text-blue-gray-800"
          } 
          hover:bg-gray-300 hover:text-black`}
          onClick={() => onClick(data.country)}
        >
          <Typography className="">{data.country}</Typography>
        </div>
      ))}
    </div>
  );
}
