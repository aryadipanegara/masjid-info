import React from "react";
import { Carousel } from "@material-tailwind/react";

const CarouselSkeleton = () => {
  return (
    <div className="relative">
      <Carousel className="h-96 lg-h w-full">
        {/* Skeleton slide */}
        <div className="h-96 lg-h w-full bg-gray-200 animate-pulse"></div>
      </Carousel>
    </div>
  );
};

export default CarouselSkeleton;
