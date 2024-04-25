"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FaBookmark } from "react-icons/fa";
import { removeBookmark } from "@/redux/actions/store";

const BookmarkPage = () => {
  const dispatch = useDispatch();
  const articleBookmarks = useSelector((state) => state.articleBookmarks);

  const handleRemoveBookmark = (articleId) => {
    dispatch(removeBookmark(articleId));
  };

  return (
    <div className="mx-auto pt-2">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 py-8 p-5">
        {articleBookmarks.length > 0 ? (
          articleBookmarks.map((articleId, index) => (
            <div key={index}>
              <Card className="max-w-sm overflow-hidden mb-4">
                {/* Your card content here */}
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  {/* Your card header content here */}
                </CardHeader>
                <CardBody>{/* Your card body content here */}</CardBody>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center -space-x-3 cursor-pointer">
                    {/* Your action icons here */}
                    <Typography
                      className="font-normal cursor-pointer"
                      onClick={() => handleRemoveBookmark(articleId)}
                    >
                      <FaBookmark className="h-5 w-5 text-red-500" />
                    </Typography>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))
        ) : (
          <Typography variant="body" color="gray">
            You haven&apos;t bookmarked any articles yet.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
