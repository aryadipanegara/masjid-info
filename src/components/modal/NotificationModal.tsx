"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const NotificationBanner = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="bg-emerald-400 p-4 text-black text-center rounded-md shadow-md">
          <p className="mb-2">
            Kami mohon maaf,Data yang terdapat di sini dapat hilang
            sewaktu-waktu. Silakan kunjungi{" "}
            <a
              href="https://masjidinfo.net"
              className="font-semibold text-blue-600 hover:underline"
            >
              masjidinfo.net
            </a>
            jika ingin melanjutkan membaca.
          </p>
          <Button onClick={handleClose} className="mt-2">
            Tutup
          </Button>
        </div>
      )}
    </>
  );
};

export default NotificationBanner;
