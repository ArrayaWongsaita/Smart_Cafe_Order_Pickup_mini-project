import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RemoveFromCartUseCase } from '../remove-from-cart.usecase';
import { CartRepositoryInterface } from '../../interfaces';
import { CartItem } from '../../types';

describe('RemoveFromCartUseCase', () => {
  let removeFromCartUseCase: RemoveFromCartUseCase;
  let mockCartRepository: CartRepositoryInterface;

  const mockCartItem: CartItem = {
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

    removeFromCartUseCase = new RemoveFromCartUseCase(mockCartRepository);
  });

  describe('execute', () => {
    it('should remove item from cart when item exists', async () => {
      const menuItemId = mockCartItem.id;
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);

      // Act
      await removeFromCartUseCase.execute(menuItemId);

      // Assert
      expect(mockCartRepository.getItemById).toHaveBeenCalledWith(menuItemId);
      expect(mockCartRepository.removeItem).toHaveBeenCalledWith(menuItemId);
      expect(mockCartRepository.removeItem).toHaveBeenCalledTimes(1);
    });

    it('should throw error when menu item ID is empty string', async () => {
      // Act & Assert
      await expect(removeFromCartUseCase.execute('')).rejects.toThrow(
        'Menu item ID is required'
      );
      expect(mockCartRepository.getItemById).not.toHaveBeenCalled();
      expect(mockCartRepository.removeItem).not.toHaveBeenCalled();
    });

    it('should throw error when menu item ID is null or undefined', async () => {
      // Act & Assert
      await expect(
        removeFromCartUseCase.execute(null as unknown as string)
      ).rejects.toThrow('Menu item ID is required');
      await expect(
        removeFromCartUseCase.execute(undefined as unknown as string)
      ).rejects.toThrow('Menu item ID is required');
      expect(mockCartRepository.getItemById).not.toHaveBeenCalled();
      expect(mockCartRepository.removeItem).not.toHaveBeenCalled();
    });

    it('should throw error when item does not exist in cart', async () => {
      const nonExistentItemId = '550e8400-e29b-41d4-a716-446655440999';
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(undefined);

      // Act & Assert
      await expect(
        removeFromCartUseCase.execute(nonExistentItemId)
      ).rejects.toThrow('Item not found in cart');
      expect(mockCartRepository.getItemById).toHaveBeenCalledWith(
        nonExistentItemId
      );
      expect(mockCartRepository.removeItem).not.toHaveBeenCalled();
    });

    it('should handle repository getItemById errors properly', async () => {
      const menuItemId = mockCartItem.id;
      const repositoryError = new Error('Database connection error');
      vi.mocked(mockCartRepository.getItemById).mockRejectedValue(
        repositoryError
      );

      // Act & Assert
      await expect(removeFromCartUseCase.execute(menuItemId)).rejects.toThrow(
        'Database connection error'
      );
      expect(mockCartRepository.removeItem).not.toHaveBeenCalled();
    });

    it('should handle repository removeItem errors properly', async () => {
      const menuItemId = mockCartItem.id;
      const repositoryError = new Error('Failed to remove item');
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);
      vi.mocked(mockCartRepository.removeItem).mockRejectedValue(
        repositoryError
      );

      // Act & Assert
      await expect(removeFromCartUseCase.execute(menuItemId)).rejects.toThrow(
        'Failed to remove item'
      );
      expect(mockCartRepository.getItemById).toHaveBeenCalledWith(menuItemId);
      expect(mockCartRepository.removeItem).toHaveBeenCalledWith(menuItemId);
    });

    it('should handle UUID format menu item ID', async () => {
      const validUUID = '550e8400-e29b-41d4-a716-446655440000';
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);

      // Act
      await removeFromCartUseCase.execute(validUUID);

      // Assert
      expect(mockCartRepository.getItemById).toHaveBeenCalledWith(validUUID);
      expect(mockCartRepository.removeItem).toHaveBeenCalledWith(validUUID);
    });

    it('should remove item even when getItemById returns undefined', async () => {
      const menuItemId = mockCartItem.id;
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(undefined);

      // Act & Assert
      await expect(removeFromCartUseCase.execute(menuItemId)).rejects.toThrow(
        'Item not found in cart'
      );
      expect(mockCartRepository.removeItem).not.toHaveBeenCalled();
    });
  });
});
