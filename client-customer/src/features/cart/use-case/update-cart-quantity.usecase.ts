import { CartRepositoryInterface } from '../interfaces';

export class UpdateCartQuantityUseCase {
  constructor(private cartRepository: CartRepositoryInterface) {}

  async execute(menuItemId: string, quantity: number): Promise<void> {
    // Validate input
    if (!menuItemId) {
      throw new Error('Menu item ID is required');
    }

    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    // Check if item exists in cart
    const existingItem = await this.cartRepository.getItemById(menuItemId);
    if (!existingItem) {
      throw new Error('Item not found in cart');
    }

    // Update quantity via repository
    await this.cartRepository.updateQuantity(menuItemId, quantity);
  }
}
