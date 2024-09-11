"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTabs from "@/components/AdminTabs";
import Loading from "../loading";
import { useAuth } from "@/lib/auth-context";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { userRole } = useAuth();

  useEffect(() => {
    if (userRole === "ADMIN" || userRole === "AUTHOR") {
      setAuthorized(true);
    } else if (userRole === null) {
      setError("Token tidak ditemukan. Harap login.");
    } else {
      setError(
        "Akses Ditolak: Anda tidak memiliki izin untuk mengakses halaman admin"
      );
      router.push("/");
    }
  }, [userRole, router]);

  if (!authorized) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AdminTabs />
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
