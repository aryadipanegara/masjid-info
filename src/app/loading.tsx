"use client";

import { useEffect } from "react";
import NProgress from "nprogress";

export default function Loading() {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return <div className="flex justify-center items-center h-screen"></div>;
}
