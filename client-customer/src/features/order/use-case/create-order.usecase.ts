import { CartItem } from '@/features/cart';
import { orderRepository } from '../repositories';

export class CreateOrderUseCase {
  async execute(cartItems: CartItem[]): Promise<{ orderCode: string }> {
    // Create order through repository
    return orderRepository.createOrder(cartItems);
  }
}

// Create a singleton instance
export const createOrderUseCase = new CreateOrderUseCase();
