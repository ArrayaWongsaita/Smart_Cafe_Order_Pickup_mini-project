import React from 'react';
import { Badge } from '@/shared/components/ui/badge';
import {
  getStatusIcon,
  getStatusText,
  getStatusColor,
} from '../utils/order-status.utils';
import { OrderStatus } from '../interfaces/order.interface';

interface OrderStatusBadgeProps {
  status: OrderStatus | string;
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const StatusIcon = getStatusIcon(status);

  return (
    <Badge
      className={`${getStatusColor(
        status
      )} text-white px-4 py-2 text-lg ${className}`}
    >
      <StatusIcon className="h-5 w-5" />
      <span className="ml-2">{getStatusText(status)}</span>
    </Badge>
  );
};
