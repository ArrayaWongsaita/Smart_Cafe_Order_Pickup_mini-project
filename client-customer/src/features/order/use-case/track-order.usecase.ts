import { orderRepository } from '../repositories';
import { Order } from '../interfaces/order.interface';

export class TrackOrderUseCase {
  async execute(orderId: string): Promise<Order> {
    return orderRepository.trackOrder(orderId);
  }
}

// Create a singleton instance
export const trackOrderUseCase = new TrackOrderUseCase();
