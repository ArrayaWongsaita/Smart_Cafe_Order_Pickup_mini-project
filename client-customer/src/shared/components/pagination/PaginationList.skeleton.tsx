import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/shared/components/ui/pagination';

interface PaginationListSkeletonProps {
  pageCount?: number;
}

export default function PaginationListSkeleton({
  pageCount = 5,
}: PaginationListSkeletonProps) {
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button Skeleton */}
        <PaginationItem>
          <Skeleton className="h-9 w-20 rounded-md" />
        </PaginationItem>

        {/* Page Numbers Skeleton */}
        {Array.from({ length: pageCount }).map((_, index) => (
          <PaginationItem key={index}>
            <Skeleton className="h-9 w-9 rounded-md" />
          </PaginationItem>
        ))}

        {/* Next Button Skeleton */}
        <PaginationItem>
          <Skeleton className="h-9 w-16 rounded-md" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
