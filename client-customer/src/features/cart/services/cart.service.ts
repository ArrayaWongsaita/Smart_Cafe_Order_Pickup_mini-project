import { CartRepository } from '../repositories';
import {
  AddToCartUseCase,
  RemoveFromCartUseCase,
  UpdateCartQuantityUseCase,
  GetCartSummaryUseCase,
  ClearCartUseCase,
} from '../use-case';

// Create a single instance of the cart repository
const cartRepository = new CartRepository();

// Create use case instances with the repository
export const addToCartUseCase = new AddToCartUseCase(cartRepository);
export const removeFromCartUseCase = new RemoveFromCartUseCase(cartRepository);
export const updateCartQuantityUseCase = new UpdateCartQuantityUseCase(
  cartRepository
);
export const getCartSummaryUseCase = new GetCartSummaryUseCase(cartRepository);
export const clearCartUseCase = new ClearCartUseCase(cartRepository);

// Export the cart service with all use cases
export const cartService = {
  addToCart: addToCartUseCase,
  removeFromCart: removeFromCartUseCase,
  updateQuantity: updateCartQuantityUseCase,
  getSummary: getCartSummaryUseCase,
  clearCart: clearCartUseCase,
} as const;
