import { Typography } from "@material-tailwind/react";

export default function Category({ active, onClick }) {
  const categoriesData = [
    { country: "Arabia" },
    { country: "Brunei" },
    { country: "Indonesia" },
    { country: "Malaysia" },
  ];

  return (
    <div>
      {categoriesData.map((data, index) => (
        <div
          key={index}
          className={`cursor-pointer px-4 py-2 rounded-xl max-h-10 inline-block mr-4 font-semibold ${
            active === data.category
              ? "bg-black text-white hover:bg-gray-300 hover:text-black"
              : "bg-gray-200 text-blue-gray-800"
          }`}
          onClick={() => onClick(data.category)}
        >
          <Typography className="">{` (${data.country})`}</Typography>
        </div>
      ))}
    </div>
  );
}
