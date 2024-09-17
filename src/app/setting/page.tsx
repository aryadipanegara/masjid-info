"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="flex items-center justify-center">
          <SettingsIcon className="h-12 w-12 text-blue-500" />
          <CardTitle className="ml-3 text-xl font-semibold text-gray-800">
            Pengaturan
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            Halaman ini sedang dalam tahap pengembangan.
          </p>
          <Button className="mt-4" variant="outline">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
