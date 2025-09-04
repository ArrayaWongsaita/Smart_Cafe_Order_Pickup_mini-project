import { CartRepositoryInterface } from '../interfaces';

export class RemoveFromCartUseCase {
  constructor(private cartRepository: CartRepositoryInterface) {}

  async execute(menuItemId: string): Promise<void> {
    // Validate input
    if (!menuItemId) {
      throw new Error('Menu item ID is required');
    }

    // Check if item exists in cart
    const existingItem = await this.cartRepository.getItemById(menuItemId);
    if (!existingItem) {
      throw new Error('Item not found in cart');
    }

    // Remove item from cart via repository
    await this.cartRepository.removeItem(menuItemId);
  }
}
