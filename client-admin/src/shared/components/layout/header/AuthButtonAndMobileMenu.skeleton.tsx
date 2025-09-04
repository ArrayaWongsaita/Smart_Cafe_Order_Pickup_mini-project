import { Skeleton } from '@/shared/components/ui/skeleton';

export default function AuthButtonAndMobileMenuSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      {/* Auth buttons skeleton for desktop */}
      <div className="hidden md:flex space-x-8">
        {/* <Skeleton className="h-9 w-16" /> */}
        <Skeleton className="h-9 w-20 px-12 rounded-full" />
      </div>

      {/* Mobile menu toggle skeleton */}
      <div className="md:hidden">
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
}
