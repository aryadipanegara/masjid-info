"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FaBookmark, FaHeart, FaImage } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import SkeletonBlog from "@/components/skeleton/skeletonBlog";
import SearchMasjid from "@/components/search/SearchMasjid";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "@/redux/actions/store";

export default function Blog({ showSearchMasjid = true }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const articleBookmarks = useSelector((state) => state.articleBookmarks);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/articles");
        setArticles(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = (query) => {
    const filteredArticles = articles.filter((article) =>
      article.nama.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredArticles);
  };

  const handleSearchResults = (searchResults) => {
    setSearchResults(searchResults);
  };

  const handleBookmark = (articleId) => {
    if (articleBookmarks.includes(articleId)) {
      dispatch(removeBookmark(articleId));
    } else {
      dispatch(addBookmark(articleId));
    }
  };

  return (
    <div className="mx-auto pt-2">
      {showSearchMasjid && <SearchMasjid handleSearch={handleSearch} />}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 py-8 p-5">
        {loading || !Array.isArray(articles) || articles.length === 0
          ? Array.from({ length: 10 }, (_, index) => (
              <SkeletonBlog key={index} />
            ))
          : (searchResults.length > 0 ? searchResults : articles).map(
              (article, index) => (
                <div key={index}>
                  <Card key={index} className="max-w-sm overflow-hidden mb-4">
                    <Link href={`/blog/${article.id}`} passHref>
                      <div title="Detail">
                        <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                          className="m-0 rounded-none"
                        >
                          {article.foto &&
                          article.foto[0] &&
                          article.foto[0].url ? (
                            <img
                              src={article.foto[0].url}
                              alt={article.nama}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = <FaImage />;
                              }}
                            />
                          ) : (
                            <FaImage className="w-full h-48 object-cover" />
                          )}
                        </CardHeader>

                        <CardBody>
                          <Typography variant="h6" color="blue-gray">
                            {article.nama.substring(0, 20)}...
                          </Typography>
                          <Typography
                            variant="body"
                            color="gray"
                            className="mt-3 font-normal"
                          >
                            {article.sejarah.substring(0, 73)}...
                          </Typography>
                        </CardBody>
                      </div>
                    </Link>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center -space-x-3 cursor-pointer">
                        {/* <FaHeart className="h-5 w-5" /> */}
                      </div>
                      <Typography
                        className="font-normal cursor-pointer"
                        onClick={() => handleBookmark(article.id)}
                      >
                        {articleBookmarks.includes(article.id) ? (
                          <FaBookmark className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FaBookmark className="h-5 w-5" />
                        )}
                      </Typography>
                    </CardFooter>
                  </Card>
                </div>
              )
            )}
      </div>
    </div>
  );
}
