import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClearCartUseCase } from '../clear-cart.usecase';
import { CartRepositoryInterface } from '../../interfaces';

describe('ClearCartUseCase', () => {
  let clearCartUseCase: ClearCartUseCase;
  let mockCartRepository: CartRepositoryInterface;

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

    clearCartUseCase = new ClearCartUseCase(mockCartRepository);
  });

  describe('execute', () => {
    it('should clear cart successfully', async () => {
      vi.mocked(mockCartRepository.clearCart).mockResolvedValue();

      // Act
      await clearCartUseCase.execute();

      // Assert
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
      expect(mockCartRepository.clearCart).toHaveBeenCalledWith();
    });

    it('should handle repository clearCart success without error', async () => {
      vi.mocked(mockCartRepository.clearCart).mockResolvedValue();

      // Act & Assert
      await expect(clearCartUseCase.execute()).resolves.toBeUndefined();
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle repository clearCart error and wrap it', async () => {
      const repositoryError = new Error('Database connection failed');
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(
        repositoryError
      );

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart: Database connection failed'
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle non-Error objects thrown by repository', async () => {
      const stringError = 'String error message';
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(stringError);

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart: Unknown error'
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle null error from repository', async () => {
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(null);

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart: Unknown error'
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle undefined error from repository', async () => {
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(undefined);

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart: Unknown error'
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle empty string error from repository', async () => {
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue('');

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart: Unknown error'
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle object error from repository', async () => {
      const objectError = { message: 'Custom error object', code: 500 };
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(objectError);

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart: Unknown error'
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle Error with empty message', async () => {
      const emptyMessageError = new Error('');
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(
        emptyMessageError
      );

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart: '
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle Error with whitespace-only message', async () => {
      const whitespaceError = new Error('   ');
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(
        whitespaceError
      );

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart:    '
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle very long error message', async () => {
      const longMessage = 'A'.repeat(1000);
      const longError = new Error(longMessage);
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(longError);

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        `Failed to clear cart: ${longMessage}`
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should handle special characters in error message', async () => {
      const specialCharError = new Error(
        'Error with special chars: 你好 🎉 @#$%'
      );
      vi.mocked(mockCartRepository.clearCart).mockRejectedValue(
        specialCharError
      );

      // Act & Assert
      await expect(clearCartUseCase.execute()).rejects.toThrow(
        'Failed to clear cart: Error with special chars: 你好 🎉 @#$%'
      );
      expect(mockCartRepository.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should not call any other repository methods', async () => {
      vi.mocked(mockCartRepository.clearCart).mockResolvedValue();

      // Act
      await clearCartUseCase.execute();

      // Assert
      expect(mockCartRepository.addItem).not.toHaveBeenCalled();
      expect(mockCartRepository.removeItem).not.toHaveBeenCalled();
      expect(mockCartRepository.updateQuantity).not.toHaveBeenCalled();
      expect(mockCartRepository.incrementQuantity).not.toHaveBeenCalled();
      expect(mockCartRepository.decrementQuantity).not.toHaveBeenCalled();
      expect(mockCartRepository.getCartItems).not.toHaveBeenCalled();
      expect(mockCartRepository.getItemById).not.toHaveBeenCalled();
      expect(mockCartRepository.getTotalItems).not.toHaveBeenCalled();
      expect(mockCartRepository.getTotalPrice).not.toHaveBeenCalled();
      expect(mockCartRepository.getItemCount).not.toHaveBeenCalled();
      expect(mockCartRepository.setLoading).not.toHaveBeenCalled();
      expect(mockCartRepository.setError).not.toHaveBeenCalled();
    });
  });
});
