import { Typography } from "@material-tailwind/react";

export default function Category({ category, active, onClick }) {
  const categoryClass = active
    ? "bg-black text-white"
    : "bg-gray-200 text-blue-gray-800";

  return (
    <div
      className={`cursor-pointer px-4 py-2 rounded-full inline-block mr-4 ${categoryClass}`}
      onClick={() => onClick(category)}
    >
      <Typography variant="h6">{category}</Typography>
    </div>
  );
}
