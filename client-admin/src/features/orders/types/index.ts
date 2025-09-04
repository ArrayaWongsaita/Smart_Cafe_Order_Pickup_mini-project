export interface OrderItem {
  id: string;
  orderId: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
  itemId: string;
  createdAt: string;
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    active: boolean;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Order {
  id: string;
  orderCode: string;
  customerId: string | null;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  notes: string | null;
  items: OrderItem[];
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  message: string;
}

export interface NewOrderNotification {
  id: string;
  orderCode: string;
  customerId: string | null;
  status: Order['status'];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  notes: string | null;
  items: OrderItem[];
  message: string;
}

export interface OrderStatusUpdateNotification {
  orderId: string;
  data: Order;
  message: string;
}

export interface UpdateOrderStatusResponse {
  success: boolean;
  data: Order;
  message: string;
}

export type OrderStatusFilter = Order['status'] | 'ALL' | 'ACTIVE' | 'INACTIVE';
