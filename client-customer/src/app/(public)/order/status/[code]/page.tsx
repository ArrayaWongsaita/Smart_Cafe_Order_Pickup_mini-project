'use client';

import { OrderTracking, useTrackOrder } from '@/features/order';
// import { useOrder } from '@/features/order/hooks/useOrder.hook';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { Card, CardContent } from '@/shared/components/ui/card';

export default function CheckStatusOrder() {
  const param = useParams();
  // const order = useOrderStore((state) => state.order);
  const { order, stopTrackingOrder, startTrackingOrder } = useTrackOrder();

  useEffect(() => {
    if (param.code && typeof param.code === 'string') {
      startTrackingOrder(param.code);
    }

    return () => {
      if (param.code && typeof param.code === 'string') {
        stopTrackingOrder(param.code);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.code]);

  if (!order) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <OrderTracking order={order} />;
}
