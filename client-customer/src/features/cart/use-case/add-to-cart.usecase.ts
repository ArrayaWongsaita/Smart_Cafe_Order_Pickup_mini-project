import { MenuItem } from '@/features/menu/types/menu-item.type';
import { CartRepositoryInterface } from '../interfaces';

export class AddToCartUseCase {
  constructor(private cartRepository: CartRepositoryInterface) {}

  async execute(menuItem: MenuItem, quantity = 1): Promise<void> {
    // Validate input
    if (!menuItem) {
      throw new Error('Menu item is required');
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    if (!menuItem.active) {
      throw new Error('Menu item is not available');
    }

    // Add item to cart via repository
    await this.cartRepository.addItem(menuItem, quantity);
  }
}
