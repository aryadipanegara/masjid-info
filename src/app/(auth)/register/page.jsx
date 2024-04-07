"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Register() {
  const handleGoogleSignUp = () => {
    // Implement Google Sign Up Logic Here
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
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {/* Add additional input fields for registration if needed */}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleGoogleSignUp}>
            Sign up with Google
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Typography
              as="a"
              href="/login"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
