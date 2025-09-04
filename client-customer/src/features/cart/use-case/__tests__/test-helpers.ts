import { vi, expect } from 'vitest';
import { MenuItem } from '@/features/menu/types/menu-item.type';
import { CartItem } from '../../types';
import { CartRepositoryInterface } from '../../interfaces';

/**
 * Mock data factory for creating test menu items
 */
export const createMockMenuItem = (
  overrides: Partial<MenuItem> = {}
): MenuItem => ({
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
  ...overrides,
});

/**
 * Mock data factory for creating test cart items
 */
export const createMockCartItem = (
  overrides: Partial<CartItem> = {}
): CartItem => ({
  ...createMockMenuItem(),
  quantity: 1,
  addedAt: new Date('2023-01-01T10:00:00.000Z'),
  ...overrides,
});

/**
 * Creates a mock cart repository with all methods stubbed
 */
export const createMockCartRepository = (): CartRepositoryInterface => ({
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
});

/**
 * Common test scenarios and expected behaviors
 */
export const testScenarios = {
  validMenuItems: [
    createMockMenuItem(),
    createMockMenuItem({
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Latte',
      price: 12000,
    }),
    createMockMenuItem({
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Cappuccino',
      price: 11000,
      category: null,
    }),
  ],

  invalidMenuItems: [
    null,
    undefined,
    createMockMenuItem({ active: false }),
    createMockMenuItem({ id: '' }),
  ],

  invalidQuantities: [-1, -10, 0],
  validQuantities: [1, 2, 5, 10, 100],

  invalidMenuItemIds: ['', null, undefined],
  validMenuItemIds: [
    '550e8400-e29b-41d4-a716-446655440000',
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
  ],
};

/**
 * Helper function to create repository error scenarios
 */
export const createRepositoryErrors = () => ({
  databaseError: new Error('Database connection failed'),
  networkError: new Error('Network timeout'),
  validationError: new Error('Invalid data format'),
  unknownError: 'String error',
  nullError: null,
  undefinedError: undefined,
});

/**
 * Helper function to verify repository method calls
 */
export const verifyRepositoryMethodCalls = (
  repository: CartRepositoryInterface,
  expectedCalls: Record<string, number>
) => {
  Object.entries(expectedCalls).forEach(([method, times]) => {
    expect(
      repository[method as keyof CartRepositoryInterface]
    ).toHaveBeenCalledTimes(times);
  });
};

/**
 * Helper function to reset all repository mocks
 */
export const resetRepositoryMocks = (repository: CartRepositoryInterface) => {
  Object.values(repository).forEach((mock) => {
    if (vi.isMockFunction(mock)) {
      mock.mockReset();
    }
  });
};
