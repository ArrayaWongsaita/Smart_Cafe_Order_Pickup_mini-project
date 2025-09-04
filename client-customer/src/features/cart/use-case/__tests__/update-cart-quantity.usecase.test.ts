import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UpdateCartQuantityUseCase } from '../update-cart-quantity.usecase';
import { CartRepositoryInterface } from '../../interfaces';
import { CartItem } from '../../types';

describe('UpdateCartQuantityUseCase', () => {
  let updateCartQuantityUseCase: UpdateCartQuantityUseCase;
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

    updateCartQuantityUseCase = new UpdateCartQuantityUseCase(
      mockCartRepository
    );
  });

  describe('execute', () => {
    it('should update item quantity when item exists and quantity is valid', async () => {
      const menuItemId = mockCartItem.id;
      const newQuantity = 5;
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);

      // Act
      await updateCartQuantityUseCase.execute(menuItemId, newQuantity);

      // Assert
      expect(mockCartRepository.getItemById).toHaveBeenCalledWith(menuItemId);
      expect(mockCartRepository.updateQuantity).toHaveBeenCalledWith(
        menuItemId,
        newQuantity
      );
      expect(mockCartRepository.updateQuantity).toHaveBeenCalledTimes(1);
    });

    it('should update item quantity to zero', async () => {
      const menuItemId = mockCartItem.id;
      const newQuantity = 0;
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);

      // Act
      await updateCartQuantityUseCase.execute(menuItemId, newQuantity);

      // Assert
      expect(mockCartRepository.getItemById).toHaveBeenCalledWith(menuItemId);
      expect(mockCartRepository.updateQuantity).toHaveBeenCalledWith(
        menuItemId,
        newQuantity
      );
    });

    it('should throw error when menu item ID is empty string', async () => {
      // Act & Assert
      await expect(updateCartQuantityUseCase.execute('', 5)).rejects.toThrow(
        'Menu item ID is required'
      );
      expect(mockCartRepository.getItemById).not.toHaveBeenCalled();
      expect(mockCartRepository.updateQuantity).not.toHaveBeenCalled();
    });

    it('should throw error when menu item ID is null or undefined', async () => {
      // Act & Assert
      await expect(
        updateCartQuantityUseCase.execute(null as unknown as string, 5)
      ).rejects.toThrow('Menu item ID is required');
      await expect(
        updateCartQuantityUseCase.execute(undefined as unknown as string, 5)
      ).rejects.toThrow('Menu item ID is required');
      expect(mockCartRepository.getItemById).not.toHaveBeenCalled();
      expect(mockCartRepository.updateQuantity).not.toHaveBeenCalled();
    });

    it('should throw error when quantity is negative', async () => {
      const menuItemId = mockCartItem.id;

      // Act & Assert
      await expect(
        updateCartQuantityUseCase.execute(menuItemId, -1)
      ).rejects.toThrow('Quantity cannot be negative');
      await expect(
        updateCartQuantityUseCase.execute(menuItemId, -10)
      ).rejects.toThrow('Quantity cannot be negative');
      expect(mockCartRepository.getItemById).not.toHaveBeenCalled();
      expect(mockCartRepository.updateQuantity).not.toHaveBeenCalled();
    });

    it('should throw error when item does not exist in cart', async () => {
      const nonExistentItemId = '550e8400-e29b-41d4-a716-446655440999';
      const newQuantity = 3;
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(undefined);

      // Act & Assert
      await expect(
        updateCartQuantityUseCase.execute(nonExistentItemId, newQuantity)
      ).rejects.toThrow('Item not found in cart');
      expect(mockCartRepository.getItemById).toHaveBeenCalledWith(
        nonExistentItemId
      );
      expect(mockCartRepository.updateQuantity).not.toHaveBeenCalled();
    });

    it('should handle repository getItemById errors properly', async () => {
      const menuItemId = mockCartItem.id;
      const repositoryError = new Error('Database connection error');
      vi.mocked(mockCartRepository.getItemById).mockRejectedValue(
        repositoryError
      );

      // Act & Assert
      await expect(
        updateCartQuantityUseCase.execute(menuItemId, 5)
      ).rejects.toThrow('Database connection error');
      expect(mockCartRepository.updateQuantity).not.toHaveBeenCalled();
    });

    it('should handle repository updateQuantity errors properly', async () => {
      const menuItemId = mockCartItem.id;
      const newQuantity = 5;
      const repositoryError = new Error('Failed to update quantity');
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);
      vi.mocked(mockCartRepository.updateQuantity).mockRejectedValue(
        repositoryError
      );

      // Act & Assert
      await expect(
        updateCartQuantityUseCase.execute(menuItemId, newQuantity)
      ).rejects.toThrow('Failed to update quantity');
      expect(mockCartRepository.getItemById).toHaveBeenCalledWith(menuItemId);
      expect(mockCartRepository.updateQuantity).toHaveBeenCalledWith(
        menuItemId,
        newQuantity
      );
    });

    it('should handle decimal quantities by treating them as integers', async () => {
      const menuItemId = mockCartItem.id;
      const decimalQuantity = 3.7;
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);

      // Act
      await updateCartQuantityUseCase.execute(menuItemId, decimalQuantity);

      // Assert
      expect(mockCartRepository.updateQuantity).toHaveBeenCalledWith(
        menuItemId,
        decimalQuantity
      );
    });

    it('should handle very large quantities', async () => {
      const menuItemId = mockCartItem.id;
      const largeQuantity = 999999;
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(mockCartItem);

      // Act
      await updateCartQuantityUseCase.execute(menuItemId, largeQuantity);

      // Assert
      expect(mockCartRepository.updateQuantity).toHaveBeenCalledWith(
        menuItemId,
        largeQuantity
      );
    });

    it('should handle when getItemById returns undefined', async () => {
      const menuItemId = mockCartItem.id;
      vi.mocked(mockCartRepository.getItemById).mockResolvedValue(undefined);

      // Act & Assert
      await expect(
        updateCartQuantityUseCase.execute(menuItemId, 5)
      ).rejects.toThrow('Item not found in cart');
      expect(mockCartRepository.updateQuantity).not.toHaveBeenCalled();
    });
  });
});
