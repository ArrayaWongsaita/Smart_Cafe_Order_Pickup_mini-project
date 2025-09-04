import { CartRepositoryInterface } from '../interfaces';

export class ClearCartUseCase {
  constructor(private cartRepository: CartRepositoryInterface) {}

  async execute(): Promise<void> {
    try {
      // Clear cart via repository
      await this.cartRepository.clearCart();
    } catch (error) {
      throw new Error(
        `Failed to clear cart: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
}
