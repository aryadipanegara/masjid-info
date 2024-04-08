// SkeletonBlog.jsx

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const SkeletonBlog = () => {
  return (
    <Card className="max-w-sm overflow-hidden mb-4">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none animate-pulse"
      />
      <CardBody>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3 cursor-pointer">
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
      </CardFooter>
    </Card>
  );
};

export default SkeletonBlog;
