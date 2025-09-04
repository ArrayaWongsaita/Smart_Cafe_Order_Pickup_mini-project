import { useOrderStore } from '@/features/order/store';
import {
  trackOrderUseCase,
  stopTrackOrderUseCase,
} from '@/features/order/use-case';

export function useTrackOrder() {
  const order = useOrderStore((state) => state.order);
  const error = useOrderStore((state) => state.error);
  const setError = useOrderStore((state) => state.setError);
  const isLoading = useOrderStore((state) => state.isLoading);
  const setLoading = useOrderStore((state) => state.setLoading);

  const startTrackingOrder = async (orderCode: string) => {
    try {
      setLoading(true);
      await trackOrderUseCase.execute(orderCode);
    } catch {
      setError('track order failed');
    } finally {
      setLoading(false);
    }
  };

  const stopTrackingOrder = (orderCode: string) => {
    try {
      stopTrackOrderUseCase.execute(orderCode);
      setError(null);
      console.log('Order tracking stopped successfully');
    } catch (error) {
      console.error('Failed to stop order tracking:', error);
      setError('Failed to stop tracking order');
    }
  };

  return { startTrackingOrder, stopTrackingOrder, order, error, isLoading };
}
