import PaginationList from '@/shared/components/pagination/PaginationList';
import type { OrdersResponse } from '../types';

interface OrdersPaginationProps {
  meta: OrdersResponse['meta'];
  currentPage: number;
}

export function OrdersPagination({ meta }: OrdersPaginationProps) {
  if (!meta) return null;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-700">
          Showing {(meta.page - 1) * meta.limit + 1} to{' '}
          {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} orders
        </div>
      </div>

      <div className="flex justify-center">
        <PaginationList meta={meta} basePath="/orders" />
      </div>
    </div>
  );
}
