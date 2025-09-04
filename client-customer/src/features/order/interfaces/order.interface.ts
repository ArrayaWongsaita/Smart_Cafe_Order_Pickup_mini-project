export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  itemId: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
  createdAt: string;
  item: MenuItem;
}

export interface Order {
  id: string;
  orderCode: string;
  customerId: string | null;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  notes: string | null;
  items: OrderItem[];
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface CreateOrderRequest {
  data: {
    id: string;
    quantity: number;
    price: number;
  }[];
}

export interface CreateOrderResponse {
  orderCode: string;
  success: boolean;
  error?: string;
}
