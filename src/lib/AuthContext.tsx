"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthContextType {
  userRole: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role);
    } catch (error) {
      console.error("Invalid token", error);
      setUserRole(null);
    }
  };

  const login = (token: string) => {
    Cookies.set("token", token, { expires: 7 });
    verifyToken(token);
  };

  const logout = () => {
    Cookies.remove("token");
    setUserRole(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
