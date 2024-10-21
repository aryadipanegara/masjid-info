import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AllMosqueSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-12 w-3/4 mx-auto mb-8" />

      <div className="mb-8">
        <Skeleton className="h-10 w-full max-2xl mx-auto" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-8 w-40 mb-4" />
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 8].map((i) => (
          <Card key={1} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/6 mb-4" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-12" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center space-x-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
