import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function CardListPlaceholderSkeleton() {
  return (
    <div className="container mx-auto pt-2">
      <div className="justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 py-8">
          {[1, 2, 3, 4, 5,6,7,8,9,10].map((placeholder, index) => (
            <Card
              key={index}
              className="w-full max-w-sm shadow-md animate-pulse cursor-not-allowed mb-8"
            >
              <CardHeader color="blue-gray">
                <div className="w-full h-40 bg-gray-300 rounded-t-lg"></div>
              </CardHeader>
              <CardBody className="flex flex-col">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  <div className="bg-gray-300 h-5 w-20 rounded-full">
                    &nbsp;
                  </div>
                </Typography>
                <Typography className="text-gray-700 mb-4">
                  <div className="bg-gray-300 h-2 w-full rounded-full">
                    &nbsp;
                  </div>
                  <div className="bg-gray-300 h-2 w-full rounded-full">
                    &nbsp;
                  </div>
                  <div className="bg-gray-300 h-2 w-full rounded-full">
                    &nbsp;
                  </div>
                  <div className="bg-gray-300 h-2 w-full rounded-full">
                    &nbsp;
                  </div>
                  <div className="bg-gray-300 h-2 w-4/5 rounded-full">
                    &nbsp;
                  </div>
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
