import { Carousel, Typography } from "@material-tailwind/react";

export function CarouselPlaceholderSkeleton() {
  return (
    <div className="container mx-auto">
      <div className="justify-center py-2">
        <Carousel
          additionalClasses="overflow-hidden rounded-lg shadow-md"
          responsive={[
            {
              breakpoint: "sm",
              options: {
                slidesPerView: 1,
              },
            },
            {
              breakpoint: "md",
              options: {
                slidesPerView: 2,
              },
            },
            {
              breakpoint: "lg",
              options: {
                slidesPerView: 3,
              },
            },
          ]}
          autoplay={true}
          infiniteLoop={true}
          arrow={{
            next: (
              <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                &nbsp;
              </div>
            ),
            prev: (
              <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                &nbsp;
              </div>
            ),
          }}
        >
          {[1, 2, 3].map((placeholder, index) => (
            <div key={index} className="relative">
              <div className="w-full h-80 bg-gray-300 rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <Typography variant="h5" className="text-lg font-bold my-1">
                  &nbsp;
                </Typography>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
