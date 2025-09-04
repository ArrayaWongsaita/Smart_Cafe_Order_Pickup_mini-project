import { Clock, CheckCircle, Package } from 'lucide-react';
import { OrderStatus } from '../interfaces/order.interface';

export const getStatusIcon = (status: OrderStatus | string) => {
  switch (status) {
    case OrderStatus.PENDING:
      return Clock;
    case OrderStatus.PREPARING:
      return Clock;
    case OrderStatus.READY:
      return Package;
    case OrderStatus.COMPLETED:
      return CheckCircle;
    case OrderStatus.CANCELLED:
      return Clock;
    default:
      return Clock;
  }
};

export const getStatusText = (status: OrderStatus | string) => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'รอดำเนินการ';
    case OrderStatus.PREPARING:
      return 'กำลังเตรียม';
    case OrderStatus.READY:
      return 'พร้อมรับ';
    case OrderStatus.COMPLETED:
      return 'เสร็จสิ้น';
    case OrderStatus.CANCELLED:
      return 'ยกเลิก';
    default:
      return status;
  }
};

export const getStatusColor = (status: OrderStatus | string) => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'bg-gray-500';
    case OrderStatus.PREPARING:
      return 'bg-yellow-500';
    case OrderStatus.READY:
      return 'bg-blue-500';
    case OrderStatus.COMPLETED:
      return 'bg-green-500';
    case OrderStatus.CANCELLED:
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(price / 100);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
