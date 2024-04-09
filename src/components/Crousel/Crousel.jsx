"use client";

import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import axios from "axios";
import CarouselSkeleton from "@/components/skeleton/skeletonCrousel";

export function CarouselCustomNavigation() {
  const [images, setImages] = useState([]);
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/articles");
      const articleImages = response.data.data.map((article) =>
        article.foto.length > 0 ? article.foto[0].url : null
      );
      setImages(articleImages.filter((image) => image !== null));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const updateCarouselWidth = () => {
      if (carouselRef.current) {
        const width = carouselRef.current.offsetWidth;
        setCarouselWidth(width);
      }
    };

    updateCarouselWidth();

    window.addEventListener("resize", updateCarouselWidth);

    return () => {
      window.removeEventListener("resize", updateCarouselWidth);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchArticles();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <CarouselSkeleton />;
  }

  return (
    <div className="relative">
      <Carousel
        className="h-96 lg:h-auto w-full"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-full transition-all ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Slide ${index + 1}`}
            className="object-cover w-full h-96 "
          />
        ))}
      </Carousel>
    </div>
  );
}
