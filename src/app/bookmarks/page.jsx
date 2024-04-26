"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";

export default function BookmarkPage() {
  const articleBookmarks = useSelector((state) => state.articleBookmarks);

  return (
    <div className="mx-auto pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8 p-5">
        {articleBookmarks && articleBookmarks.length === 0 ? (
          <Typography variant="body" color="gray" className="font-normal">
            Tidak ada artikel yang disimpan.
          </Typography>
        ) : (
          articleBookmarks.map((article) => (
            <div key={article.id}>
              <Card className="max-w-sm overflow-hidden mb-4">
                <Link href={`/blog/${article.id}`} passHref>
                  <div title="Detail">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src={
                          article.foto && article.foto[0] && article.foto[0].url
                        }
                        alt={article.nama}
                        className="w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <Typography variant="h6" color="blue-gray">
                        {article.nama}
                      </Typography>
                      <Typography
                        variant="body"
                        color="gray"
                        className="mt-3 font-normal"
                      >
                        {article.sejarah}
                      </Typography>
                    </CardBody>
                  </div>
                </Link>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
