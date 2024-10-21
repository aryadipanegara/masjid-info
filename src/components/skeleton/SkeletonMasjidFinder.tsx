import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function MasjidFinderSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-10">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>

        <div className="mb-8">
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="flex space-x-2 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                key={i}
                className="h-10 w-24 rounded-full flex-shrink-0"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center space-x-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
