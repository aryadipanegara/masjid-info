"use client";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebaseConfig";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // Mengirimkan token otentikasi ke backend
      await axios.post("http://localhost:5000/api/auth/login-google", {
        token,
      });

      localStorage.setItem("email", result.user.email);
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
      console.error("Error signing in with Google:", error);
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
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" />
          <Input label="Password" size="lg" />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleGoogleSignIn}>
            <FcGoogle className="h-5 w-5 mr-2" />
            Sign In with Google
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="/register"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
      {error && <p>{error}</p>}
    </div>
  );
}
