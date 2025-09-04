import { describe, it, expect } from 'vitest';
import { formatPrice } from '../formatPrice.util';

describe('formatPrice', () => {
  it('should format price correctly in Thai Baht', () => {
    // Test converting cents to baht
    expect(formatPrice(10000)).toBe('฿100.00'); // 100 baht
    expect(formatPrice(5500)).toBe('฿55.00'); // 55 baht
    expect(formatPrice(1)).toBe('฿0.01'); // 1 satang
  });

  it('should handle zero price', () => {
    expect(formatPrice(0)).toBe('฿0.00');
  });

  it('should handle large numbers', () => {
    expect(formatPrice(100000000)).toBe('฿1,000,000.00'); // 1 million baht
  });

  it('should handle decimal precision', () => {
    expect(formatPrice(1234)).toBe('฿12.34');
    expect(formatPrice(99)).toBe('฿0.99');
  });

  it('should handle negative prices', () => {
    expect(formatPrice(-5000)).toBe('-฿50.00');
  });
});
