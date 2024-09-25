"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Alert from "@/components/ui/AlertCustom";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAlertInfo({ message: "", type: null });

    try {
      const response = await fetch(
        "https://masjidinfo-backend.vercel.app/api/users/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed");
      }

      const data = await response.json();
      setAlertInfo({
        message: "OTP verification successful!",
        type: "success",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Verification error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setAlertInfo({
        message: "Verification failed. Please check your OTP.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        {alertInfo.type && (
          <Alert
            message={alertInfo.message}
            type={alertInfo.type}
            duration={3000}
            onClose={() => setAlertInfo({ message: "", type: null })}
          />
        )}
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Verify Your OTP</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter your OTP code"
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button className="text-blue-600 hover:underline">
              Resend OTP
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOTP;
