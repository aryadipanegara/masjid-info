import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center justify-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
            Maintenance Mode
          </CardTitle>
          <CardDescription className="text-center">
            We're currently performing some maintenance on our site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-gray-600">
            We apologize for any inconvenience. Our site will be back up
            shortly.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
