import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetCartSummaryUseCase } from '../get-cart-summary.usecase';
import { CartRepositoryInterface } from '../../interfaces';
import { CartItem } from '../../types';

describe('GetCartSummaryUseCase', () => {
  let getCartSummaryUseCase: GetCartSummaryUseCase;
  let mockCartRepository: CartRepositoryInterface;

  const mockCartItems: CartItem[] = [
    {
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
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Latte',
      description: 'Coffee with milk',
      price: 12000,
      imageUrl: 'https://example.com/latte.jpg',
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
      quantity: 1,
      addedAt: new Date('2023-01-01T10:15:00.000Z'),
    },
  ];

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

    getCartSummaryUseCase = new GetCartSummaryUseCase(mockCartRepository);
  });

  describe('execute', () => {
    it('should return cart summary with items when cart has items', async () => {
      const totalItems = 3;
      const totalPrice = 29000;

      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue(
        mockCartItems
      );
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(totalItems);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(totalPrice);

      // Act
      const result = await getCartSummaryUseCase.execute();

      // Assert
      expect(result).toEqual({
        items: mockCartItems,
        totalItems,
        totalPrice,
        isEmpty: false,
      });

      expect(mockCartRepository.getCartItems).toHaveBeenCalledTimes(1);
      expect(mockCartRepository.getTotalItems).toHaveBeenCalledTimes(1);
      expect(mockCartRepository.getTotalPrice).toHaveBeenCalledTimes(1);
    });

    it('should return cart summary with empty items when cart is empty', async () => {
      const emptyItems: CartItem[] = [];
      const totalItems = 0;
      const totalPrice = 0;

      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue(emptyItems);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(totalItems);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(totalPrice);

      // Act
      const result = await getCartSummaryUseCase.execute();

      // Assert
      expect(result).toEqual({
        items: emptyItems,
        totalItems,
        totalPrice,
        isEmpty: true,
      });

      expect(mockCartRepository.getCartItems).toHaveBeenCalledTimes(1);
      expect(mockCartRepository.getTotalItems).toHaveBeenCalledTimes(1);
      expect(mockCartRepository.getTotalPrice).toHaveBeenCalledTimes(1);
    });

    it('should return isEmpty true when items array is empty', async () => {
      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue([]);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(0);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(0);

      // Act
      const result = await getCartSummaryUseCase.execute();

      // Assert
      expect(result.isEmpty).toBe(true);
      expect(result.items).toEqual([]);
    });

    it('should return isEmpty false when items array has content', async () => {
      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue(
        mockCartItems
      );
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(3);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(29000);

      // Act
      const result = await getCartSummaryUseCase.execute();

      // Assert
      expect(result.isEmpty).toBe(false);
      expect(result.items.length).toBe(2);
    });

    it('should handle repository getCartItems error', async () => {
      const error = new Error('Failed to get cart items');
      vi.mocked(mockCartRepository.getCartItems).mockRejectedValue(error);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(0);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(0);

      // Act & Assert
      await expect(getCartSummaryUseCase.execute()).rejects.toThrow(
        'Failed to get cart summary: Failed to get cart items'
      );
    });

    it('should handle repository getTotalItems error', async () => {
      const error = new Error('Failed to get total items');
      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue(
        mockCartItems
      );
      vi.mocked(mockCartRepository.getTotalItems).mockRejectedValue(error);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(29000);

      // Act & Assert
      await expect(getCartSummaryUseCase.execute()).rejects.toThrow(
        'Failed to get cart summary: Failed to get total items'
      );
    });

    it('should handle repository getTotalPrice error', async () => {
      const error = new Error('Failed to get total price');
      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue(
        mockCartItems
      );
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(3);
      vi.mocked(mockCartRepository.getTotalPrice).mockRejectedValue(error);

      // Act & Assert
      await expect(getCartSummaryUseCase.execute()).rejects.toThrow(
        'Failed to get cart summary: Failed to get total price'
      );
    });

    it('should handle non-Error objects thrown by repository', async () => {
      const error = 'String error';
      vi.mocked(mockCartRepository.getCartItems).mockRejectedValue(error);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(0);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(0);

      // Act & Assert
      await expect(getCartSummaryUseCase.execute()).rejects.toThrow(
        'Failed to get cart summary: Unknown error'
      );
    });

    it('should handle null error objects', async () => {
      vi.mocked(mockCartRepository.getCartItems).mockRejectedValue(null);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(0);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(0);

      // Act & Assert
      await expect(getCartSummaryUseCase.execute()).rejects.toThrow(
        'Failed to get cart summary: Unknown error'
      );
    });

    it('should handle undefined error objects', async () => {
      vi.mocked(mockCartRepository.getCartItems).mockRejectedValue(undefined);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(0);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(0);

      // Act & Assert
      await expect(getCartSummaryUseCase.execute()).rejects.toThrow(
        'Failed to get cart summary: Unknown error'
      );
    });

    it('should call all repository methods in parallel using Promise.all', async () => {
      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue(
        mockCartItems
      );
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(3);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(29000);

      // Act
      await getCartSummaryUseCase.execute();

      // Assert
      // All three methods should be called exactly once
      expect(mockCartRepository.getCartItems).toHaveBeenCalledTimes(1);
      expect(mockCartRepository.getTotalItems).toHaveBeenCalledTimes(1);
      expect(mockCartRepository.getTotalPrice).toHaveBeenCalledTimes(1);

      // All methods should be called without any parameters
      expect(mockCartRepository.getCartItems).toHaveBeenCalledWith();
      expect(mockCartRepository.getTotalItems).toHaveBeenCalledWith();
      expect(mockCartRepository.getTotalPrice).toHaveBeenCalledWith();
    });

    it('should handle single item in cart', async () => {
      const singleItem = [mockCartItems[0]];
      vi.mocked(mockCartRepository.getCartItems).mockResolvedValue(singleItem);
      vi.mocked(mockCartRepository.getTotalItems).mockResolvedValue(2);
      vi.mocked(mockCartRepository.getTotalPrice).mockResolvedValue(17000);

      // Act
      const result = await getCartSummaryUseCase.execute();

      // Assert
      expect(result).toEqual({
        items: singleItem,
        totalItems: 2,
        totalPrice: 17000,
        isEmpty: false,
      });
    });
  });
});
