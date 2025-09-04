'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import { useNavigation } from '@/features/transitionNavigate/hooks/navigation';
import { useRouter, usePathname } from 'next/navigation';

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginationListProps {
  meta: PaginationMeta;
  basePath: string; // เช่น "/menu"
}

export default function PaginationList({
  meta,
  basePath,
}: PaginationListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { TransitionNavigate } = useNavigation();
  const { page, totalPages, hasNextPage, hasPreviousPage } = meta;

  // ถ้ามีหน้าเดียวไม่ต้องแสดง pagination
  if (totalPages <= 1) {
    return null;
  }

  const handleNavigate = async (targetHref: string) => {
    await TransitionNavigate(targetHref, router, pathname);
  };

  // สร้างรายการหน้าที่จะแสดง
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // จำนวนหน้าสูงสุดที่แสดง

    if (totalPages <= maxVisible) {
      // แสดงทุกหน้าถ้าน้อยกว่าหรือเท่ากับ maxVisible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // แสดงหน้าที่เลือกแล้ว + หน้าข้างๆ
      if (page <= 3) {
        // กรณีอยู่หน้าแรกๆ
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        // กรณีอยู่หน้าสุดท้าย
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        // กรณีอยู่กลางๆ
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          {hasPreviousPage ? (
            <PaginationPrevious
              onClick={() => handleNavigate(`${basePath}/${page - 1}`)}
              className="cursor-pointer"
            />
          ) : (
            <PaginationPrevious className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>

        {/* Page Numbers */}
        {visiblePages.map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === '...' ? (
              <PaginationEllipsis />
            ) : (
              <TransitionLink href={`${basePath}/${pageNumber}`}>
                <PaginationLink isActive={pageNumber === page}>
                  {pageNumber}
                </PaginationLink>
              </TransitionLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          {hasNextPage ? (
            <PaginationNext
              onClick={() => handleNavigate(`${basePath}/${page + 1}`)}
              className="cursor-pointer"
            />
          ) : (
            <PaginationNext className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
