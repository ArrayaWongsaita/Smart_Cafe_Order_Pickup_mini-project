import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AddToCartUseCase } from '../add-to-cart.usecase';
import { CartRepositoryInterface } from '../../interfaces';
import { MenuItem } from '@/features/menu/types/menu-item.type';

describe('AddToCartUseCase', () => {
  let addToCartUseCase: AddToCartUseCase;
  let mockCartRepository: CartRepositoryInterface;

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
  });

  describe('execute', () => {
    it('should add menu item to cart with default quantity 1', async () => {
      // Act
      await addToCartUseCase.execute(mockMenuItem);

      // Assert
      expect(mockCartRepository.addItem).toHaveBeenCalledWith(mockMenuItem, 1);
      expect(mockCartRepository.addItem).toHaveBeenCalledTimes(1);
    });

    it('should add menu item to cart with specified quantity', async () => {
      const quantity = 3;

      // Act
      await addToCartUseCase.execute(mockMenuItem, quantity);

      // Assert
      expect(mockCartRepository.addItem).toHaveBeenCalledWith(
        mockMenuItem,
        quantity
      );
      expect(mockCartRepository.addItem).toHaveBeenCalledTimes(1);
    });

    it('should throw error when menu item is null or undefined', async () => {
      // Act & Assert
      await expect(
        addToCartUseCase.execute(null as unknown as MenuItem)
      ).rejects.toThrow('Menu item is required');
      await expect(
        addToCartUseCase.execute(undefined as unknown as MenuItem)
      ).rejects.toThrow('Menu item is required');
      expect(mockCartRepository.addItem).not.toHaveBeenCalled();
    });

    it('should throw error when quantity is zero', async () => {
      // Act & Assert
      await expect(addToCartUseCase.execute(mockMenuItem, 0)).rejects.toThrow(
        'Quantity must be greater than 0'
      );
      expect(mockCartRepository.addItem).not.toHaveBeenCalled();
    });

    it('should throw error when quantity is negative', async () => {
      // Act & Assert
      await expect(addToCartUseCase.execute(mockMenuItem, -1)).rejects.toThrow(
        'Quantity must be greater than 0'
      );
      expect(mockCartRepository.addItem).not.toHaveBeenCalled();
    });

    it('should throw error when menu item is not active', async () => {
      const inactiveMenuItem = { ...mockMenuItem, active: false };

      // Act & Assert
      await expect(addToCartUseCase.execute(inactiveMenuItem)).rejects.toThrow(
        'Menu item is not available'
      );
      expect(mockCartRepository.addItem).not.toHaveBeenCalled();
    });

    it('should handle repository errors properly', async () => {
      const repositoryError = new Error('Repository error');
      vi.mocked(mockCartRepository.addItem).mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(addToCartUseCase.execute(mockMenuItem)).rejects.toThrow(
        'Repository error'
      );
    });

    it('should work with menu item that has null category', async () => {
      const menuItemWithNullCategory = { ...mockMenuItem, category: null };

      // Act
      await addToCartUseCase.execute(menuItemWithNullCategory);

      // Assert
      expect(mockCartRepository.addItem).toHaveBeenCalledWith(
        menuItemWithNullCategory,
        1
      );
      expect(mockCartRepository.addItem).toHaveBeenCalledTimes(1);
    });

    it('should work with menu item that has no description', async () => {
      const menuItemWithoutDescription = {
        ...mockMenuItem,
        description: undefined,
      };

      // Act
      await addToCartUseCase.execute(menuItemWithoutDescription);

      // Assert
      expect(mockCartRepository.addItem).toHaveBeenCalledWith(
        menuItemWithoutDescription,
        1
      );
      expect(mockCartRepository.addItem).toHaveBeenCalledTimes(1);
    });
  });
});
