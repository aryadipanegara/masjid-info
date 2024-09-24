"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userRole) {
      router.push("/auth/login");
    } else if (allowedRoles && !allowedRoles.includes(userRole)) {
      router.push("/unauthorized");
    }
  }, [userRole, router, allowedRoles]);

  if (!userRole || (allowedRoles && !allowedRoles.includes(userRole))) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
