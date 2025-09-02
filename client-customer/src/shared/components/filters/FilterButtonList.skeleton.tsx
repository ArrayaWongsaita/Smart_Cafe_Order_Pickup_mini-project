import { Skeleton } from '@/shared/components/ui/skeleton';

interface FilterButtonListSkeletonProps {
  buttonCount?: number;
  showLabel?: boolean;
  showAllButton?: boolean;
  className?: string;
}

export default function FilterButtonListSkeleton({
  buttonCount = 4,
  showLabel = true,
  showAllButton = true,
  className = '',
}: FilterButtonListSkeletonProps) {
  // สร้างความยาวที่แตกต่างกันสำหรับปุ่ม
  const buttonWidths = ['w-16', 'w-20', 'w-24', 'w-18', 'w-22', 'w-28'];

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label Skeleton */}
      {showLabel && <Skeleton className="h-4 w-24 mb-2" />}

      {/* Buttons Container */}
      <div className="flex flex-wrap gap-2">
        {/* "ทั้งหมด" Button Skeleton */}
        {showAllButton && <Skeleton className="h-10 w-16 rounded-lg" />}

        {/* Filter Buttons Skeleton */}
        {Array.from({ length: buttonCount }).map((_, index) => {
          const widthClass = buttonWidths[index % buttonWidths.length];
          return (
            <Skeleton key={index} className={`h-10 ${widthClass} rounded-lg`} />
          );
        })}
      </div>

      {/* Current Filter Indicator Skeleton */}
      <Skeleton className="h-3 w-32" />
    </div>
  );
}
