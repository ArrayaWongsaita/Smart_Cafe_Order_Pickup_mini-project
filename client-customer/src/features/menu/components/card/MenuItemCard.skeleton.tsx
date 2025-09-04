import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';

export default function MenuItemCardSkeleton() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0">
        {/* Image skeleton */}
        <Skeleton className="h-48 w-full rounded-t-xl rounded-b-none" />
      </CardHeader>

      <CardContent className="p-4">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Description skeleton - 2 lines */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />

        {/* Price skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Button skeleton */}
        <Skeleton className="h-10 w-full rounded-lg" />
      </CardFooter>
    </Card>
  );
}
