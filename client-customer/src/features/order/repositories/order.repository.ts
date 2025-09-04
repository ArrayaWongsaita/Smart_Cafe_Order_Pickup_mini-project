import { CartItem } from '@/features/cart/store/cart.store';
import { OrderRepositoryInterface } from '../interfaces';
import { Order } from '../interfaces/order.interface';
import { useSocket } from '@/shared/hooks/useSocket.hook';
import {
  CREATE_ORDER_EVENT,
  TRACK_ORDER_EVENT,
  ORDER_STATUS_UPDATE_EVENT,
  STOP_TRACK_ORDER_EVENT,
} from '@/features/order/constants';
import { useOrderStore } from '@/features/order/store';

export class OrderRepository implements OrderRepositoryInterface {
  async createOrder(cartItems: CartItem[]): Promise<{ orderCode: string }> {
    const { socket } = useSocket.getState();

    if (!socket) {
      throw new Error('Socket not initialized');
    }

    const convertedData = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    return new Promise<{ orderCode: string }>((resolve, reject) => {
      socket.emit(
        CREATE_ORDER_EVENT,
        { data: convertedData },
        (response: { success: boolean; orderCode: string }) => {
          if (response.success) {
            console.log('Order created successfully:', response);
            resolve({ orderCode: response.orderCode });
          } else {
            reject(new Error('Failed to create order'));
          }
        }
      );
    });
  }

  async trackOrder(orderCode: string): Promise<Order> {
    const { socket } = useSocket.getState();

    if (!socket) {
      throw new Error('Socket not initialized');
    }
    // Subscribe to order status updates
    socket.on(
      ORDER_STATUS_UPDATE_EVENT,
      (updateData: { orderId: string; data: Order }) => {
        console.log('Order status update received:', updateData);
        useOrderStore.getState().setOrder(updateData.data);
      }
    );

    return new Promise<Order>((resolve, reject) => {
      socket.emit(
        TRACK_ORDER_EVENT,
        { orderCode },
        (response: { success: boolean; order?: Order; error?: string }) => {
          if (response.success && response.order) {
            useOrderStore.getState().setOrder(response.order);
            resolve(response.order);
          } else {
            reject(new Error(response.error || 'Failed to track order'));
          }
        }
      );
    });
  }

  stopTrackOrder(orderCode: string): void {
    const { socket } = useSocket.getState();

    if (!socket) {
      return;
    }

    // Remove socket listeners for order tracking
    socket.off(ORDER_STATUS_UPDATE_EVENT);

    // Optionally emit stop tracking event to server
    socket.emit(STOP_TRACK_ORDER_EVENT, { orderCode });

    // Clear order from store
    useOrderStore.getState().clearOrder();

    console.log('Order tracking stopped and listeners cleaned up');
  }
}

// Create a singleton instance
export const orderRepository = new OrderRepository();
