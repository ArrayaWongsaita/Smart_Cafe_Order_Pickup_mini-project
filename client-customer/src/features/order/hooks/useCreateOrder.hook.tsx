'use client';
import { useCartStore } from '@/features/cart';
import { createOrderUseCase } from '@/features/order/use-case';
import { PUBLIC_ROUTE } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useCreateOrder() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createOrder = async () => {
    const cartItems = useCartStore.getState().items;
    const clearCart = useCartStore.getState().clearCart;
    try {
      setLoading(true);
      const order = await createOrderUseCase.execute(cartItems);
      clearCart();
      router.push(PUBLIC_ROUTE.ORDER_STATUS(order.orderCode));
    } catch {
      setError('เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ');
    } finally {
      setLoading(false);
    }
  };

  return { error, isLoading, createOrder };
}
