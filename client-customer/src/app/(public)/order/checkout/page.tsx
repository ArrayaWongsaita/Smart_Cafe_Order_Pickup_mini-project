'use client';

import { useCreateOrder } from '@/features/order';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import { Button } from '@/shared/components/ui/button';
import { PUBLIC_ROUTE } from '@/shared/constants';
import { useSocket } from '@/shared/hooks';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const isConnected = useSocket((state) => state.isConnected);
  const { createOrder, isLoading, error } = useCreateOrder();

  useEffect(() => {
    if (isConnected && !isLoading) {
      createOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-secondary">
          <div className="text-center">
            {/* Processing Text */}
            <h2 className="text-2xl font-bold text-primary mb-2">
              กำลังดำเนินการสั่งซื้อ
            </h2>
            <p className="mb-4 text-secondary-foreground">กรุณารอสักครู่...</p>

            {/* Animated Dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="min-h-screen flex items-center justify-center bg-secondary">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              เกิดข้อผิดพลาด
            </h2>
            <p className="mb-4 text-secondary-foreground">
              ไม่สามารถดำเนินการสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง
            </p>
            <TransitionLink href={PUBLIC_ROUTE.HOME}>
              <Button asChild>
                <span>กลับหน้าแรก</span>
              </Button>
            </TransitionLink>
          </div>
        </div>
      ) : null}
    </>
  );
}
