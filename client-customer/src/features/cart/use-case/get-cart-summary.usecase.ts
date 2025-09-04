import { CartItem } from '../types';
import { CartRepositoryInterface } from '../interfaces';

export class GetCartSummaryUseCase {
  constructor(private cartRepository: CartRepositoryInterface) {}

  async execute(): Promise<{
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isEmpty: boolean;
  }> {
    try {
      // Get all cart data via repository
      const [items, totalItems, totalPrice] = await Promise.all([
        this.cartRepository.getCartItems(),
        this.cartRepository.getTotalItems(),
        this.cartRepository.getTotalPrice(),
      ]);

      return {
        items,
        totalItems,
        totalPrice,
        isEmpty: items.length === 0,
      };
    } catch (error) {
      throw new Error(
        `Failed to get cart summary: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
}
