import { CartItem } from '@/features/cart';
import { Order } from './order.interface';

export interface OrderRepositoryInterface {
  // Create a new order
  createOrder(cartItems: CartItem[]): Promise<{ orderCode: string }>;

  // Track order status with socket subscription
  trackOrder(orderCode: string): Promise<Order>;

  // Stop tracking order and cleanup socket listeners
  stopTrackOrder(orderCode: string): void;
}
