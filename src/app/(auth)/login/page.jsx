"use client";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebaseConfig";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Menambah state untuk menangani status loading

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true); // Mengatur status loading menjadi true ketika proses sign-in dimulai
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      await axios.post("http://localhost:5000/api/auth/login-google", {
        token,
      });

      localStorage.setItem("email", result.user.email);
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false); // Mengatur status loading menjadi false setelah proses selesai (baik berhasil atau gagal)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          {/* Menggunakan kondisional rendering untuk menampilkan skeleton saat loading */}
          {loading ? (
            <div className="animate-pulse">
              <div className="h-10 w-32 bg-gray-300 mb-2"></div>
              <div className="h-8 w-48 bg-gray-300"></div>
            </div>
          ) : (
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          )}
        </CardHeader>

        <CardFooter className="pt-0">
          {/* Menggunakan kondisional rendering untuk menampilkan skeleton saat loading */}
          {loading ? (
            <Button variant="gradient" fullWidth disabled>
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 mr-2 bg-gray-300 rounded-full"></div>
                <div className="w-36 h-8 bg-gray-300"></div>
              </div>
            </Button>
          ) : (
            <Button variant="gradient" fullWidth onClick={handleGoogleSignIn}>
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign In with Google
            </Button>
          )}
        </CardFooter>
      </Card>
      {error && <p>{error}</p>}
    </div>
  );
}
