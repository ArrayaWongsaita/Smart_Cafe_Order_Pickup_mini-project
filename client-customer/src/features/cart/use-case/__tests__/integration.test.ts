import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  AddToCartUseCase,
  RemoveFromCartUseCase,
  UpdateCartQuantityUseCase,
  GetCartSummaryUseCase,
  ClearCartUseCase,
} from '../index';
import { CartRepositoryInterface } from '../../interfaces';
import { MenuItem } from '@/features/menu/types/menu-item.type';
import { CartItem } from '../../types';

describe('Cart Use Cases Integration', () => {
  let mockCartRepository: CartRepositoryInterface;
  let addToCartUseCase: AddToCartUseCase;
  let removeFromCartUseCase: RemoveFromCartUseCase;
  let updateCartQuantityUseCase: UpdateCartQuantityUseCase;
  let getCartSummaryUseCase: GetCartSummaryUseCase;
  let clearCartUseCase: ClearCartUseCase;

  const mockMenuItem: MenuItem = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Americano',
    description: 'Rich black coffee',
    price: 8500,
    imageUrl: 'https://example.com/americano.jpg',
    active: true,
    category: {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Coffee',
      sortOrder: 1,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  const mockCartItem: CartItem = {
    ...mockMenuItem,
    quantity: 2,
    addedAt: new Date('2023-01-01T10:00:00.000Z'),
  };

  beforeEach(() => {
    mockCartRepository = {
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      incrementQuantity: vi.fn(),
      decrementQuantity: vi.fn(),
      clearCart: vi.fn(),
      getCartItems: vi.fn(),
      getItemById: vi.fn(),
      getTotalItems: vi.fn(),
      getTotalPrice: vi.fn(),
      getItemCount: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
    };

    addToCartUseCase = new AddToCartUseCase(mockCartRepository);
    removeFromCartUseCase = new RemoveFromCartUseCase(mockCartRepository);
    updateCartQuantityUseCase = new UpdateCartQuantityUseCase(
      mockCartRepository
    );
    getCartSummaryUseCase = new GetCartSummaryUseCase(mockCartRepository);
    clearCartUseCase = new ClearCartUseCase(mockCartRepository);
  });

  describe('Cart workflow integration', () => {
    it('should handle complete cart workflow: add -> update -> get summary -> remove -> clear', async () => {
      // Setup mock responses
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);
      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue([
        mockCartItem,
      ]);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(2);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(17000);

      // 1. Add item to cart
      await addToCartUseCase.execute(mockMenuItem, 2);
      expect(mockCartRepository.addItem).toHaveBeenCalledWith(mockMenuItem, 2);

      // 2. Update item quantity
      await updateCartQuantityUseCase.execute(mockMenuItem.id, 3);
      expect(mockCartRepository.getItemById).toHaveBeenCalledWith(
        mockMenuItem.id
      );
      expect(mockCartRepository.updateQuantity).toHaveBeenCalledWith(
        mockMenuItem.id,
        3
      );

      // 3. Get cart summary
      const summary = await getCartSummaryUseCase.execute();
      expect(summary).toEqual({
        items: [mockCartItem],
        totalItems: 2,
        totalPrice: 17000,
        isEmpty: false,
      });

      // 4. Remove item from cart
      await removeFromCartUseCase.execute(mockMenuItem.id);
      expect(mockCartRepository.removeItem).toHaveBeenCalledWith(
        mockMenuItem.id
      );

      // 5. Clear entire cart
      await clearCartUseCase.execute();
      expect(mockCartRepository.clearCart).toHaveBeenCalled();
    });

    it('should handle multiple items workflow', async () => {
      const secondMenuItem: MenuItem = {
        ...mockMenuItem,
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Latte',
        price: 12000,
      };

      const firstCartItem: CartItem = { ...mockCartItem, quantity: 1 };
      const secondCartItem: CartItem = {
        ...secondMenuItem,
        quantity: 2,
        addedAt: new Date('2023-01-01T10:15:00.000Z'),
      };

      vi.mocked(mockCartRepository.getItemById)
        .mockResolvedValueOnce(firstCartItem)
        .mockResolvedValueOnce(secondCartItem);
      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue([
        firstCartItem,
        secondCartItem,
      ]);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(3);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(32500);

      // Add two different items
      await addToCartUseCase.execute(mockMenuItem, 1);
      await addToCartUseCase.execute(secondMenuItem, 2);

      // Update quantity of first item
      await updateCartQuantityUseCase.execute(mockMenuItem.id, 3);

      // Get summary with multiple items
      const summary = await getCartSummaryUseCase.execute();
      expect(summary.items).toHaveLength(2);
      expect(summary.totalItems).toBe(3);
      expect(summary.totalPrice).toBe(32500);
      expect(summary.isEmpty).toBe(false);

      // Remove one item
      await removeFromCartUseCase.execute(mockMenuItem.id);

      expect(mockCartRepository.addItem).toHaveBeenCalledTimes(2);
      expect(mockCartRepository.updateQuantity).toHaveBeenCalledTimes(1);
      expect(mockCartRepository.removeItem).toHaveBeenCalledTimes(1);
    });

    it('should handle error scenarios across different use cases', async () => {
      // Test adding inactive item
      const inactiveItem = { ...mockMenuItem, active: false };
      await expect(addToCartUseCase.execute(inactiveItem)).rejects.toThrow(
        'Menu item is not available'
      );

      // Test removing non-existent item
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(undefined);
      await expect(
        removeFromCartUseCase.execute('non-existent-id')
      ).rejects.toThrow('Item not found in cart');

      // Test updating quantity of non-existent item
      await expect(
        updateCartQuantityUseCase.execute('non-existent-id', 5)
      ).rejects.toThrow('Item not found in cart');

      // Test repository error in get summary
      vi.mocked(mockCartRepository.getCartItems).mockRejectedValue(
        new Error('Database error')
      );
      await expect(getCartSummaryUseCase.execute()).rejects.toThrow(
        'Failed to get cart summary: Database error'
      );

      // Test repository error in clear cart
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(
        new Error('Clear failed')
      );
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart: Clear failed'
      );
    });

    it('should handle edge cases and boundary conditions', async () => {
      // Test adding with zero quantity
      await expect(addToCartUseCase.execute(mockMenuItem, 0)).rejects.toThrow(
        'Quantity must be greater than 0'
      );

      // Test updating with negative quantity
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);
      await expect(
        updateCartQuantityUseCase.execute(mockMenuItem.id, -1)
      ).rejects.toThrow('Quantity cannot be negative');

      // Test empty cart summary
      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue([]);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(0);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(0);

      const emptySummary = await getCartSummaryUseCase.execute();
      expect(emptySummary.isEmpty).toBe(true);
      expect(emptySummary.items).toEqual([]);
      expect(emptySummary.totalItems).toBe(0);
      expect(emptySummary.totalPrice).toBe(0);
    });

    it('should maintain repository interface consistency across all use cases', async () => {
      // All use cases should use the same repository instance
      expect(addToCartUseCase).toBeInstanceOf(AddToCartUseCase);
      expect(removeFromCartUseCase).toBeInstanceOf(RemoveFromCartUseCase);
      expect(updateCartQuantityUseCase).toBeInstanceOf(
        UpdateCartQuantityUseCase
      );
      expect(getCartSummaryUseCase).toBeInstanceOf(GetCartSummaryUseCase);
      expect(clearCartUseCase).toBeInstanceOf(ClearCartUseCase);

      // Verify repository interface compliance
      const repositoryMethods = [
        'addItem',
        'removeItem',
        'updateQuantity',
        'incrementQuantity',
        'decrementQuantity',
        'clearCart',
        'getCartItems',
        'getItemById',
        'getTotalItems',
        'getTotalPrice',
        'getItemCount',
        'setLoading',
        'setError',
      ];

      repositoryMethods.forEach((method) => {
        expect(mockCartRepository).toHaveProperty(method);
        expect(
          typeof mockCartRepository[method as keyof CartRepositoryInterface]
        ).toBe('function');
      });
    });
  });
});
