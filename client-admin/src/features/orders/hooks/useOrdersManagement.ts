import { useEffect } from 'react';
import { useSocket } from '@/shared/hooks';
import { useOrdersStore } from '../store/orders.store';
import type {
  Order,
  OrdersResponse,
  NewOrderNotification,
  OrderStatusUpdateNotification,
  UpdateOrderStatusResponse,
} from '../types';

export function useOrdersManagement(currentPage: number) {
  const { socket, isConnected } = useSocket();
  const {
    setOrders,
    setMeta,
    setLoading,
    addNewOrder,
    updateOrderStatus: updateOrderInStore,
  } = useOrdersStore();

  const fetchOrders = () => {
    if (!socket || !isConnected) return;

    setLoading(true);
    socket.emit(
      'order:get-all-orders',
      { page: currentPage, limit: 100 },
      (response: OrdersResponse) => {
        if (response.success) {
          console.log('Fetched orders:', response);
          setOrders(response.data);
          setMeta(response.meta);
        }
        setLoading(false);
      }
    );
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    if (!socket) return;

    socket.emit(
      'order:update-status',
      { orderId, status },
      (response: UpdateOrderStatusResponse) => {
        if (response.success) {
          updateOrderInStore(orderId, response.data);
        }
      }
    );
  };

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Join new orders room for real-time notifications
    socket.emit('order:join-new-orders');

    // Listen for new order notifications
    socket.on('order:new-order-notification', (data: NewOrderNotification) => {
      console.log('New order notification:', data);
      addNewOrder(data);
    });

    // Listen for order status updates
    socket.on('order:status-update', (data: OrderStatusUpdateNotification) => {
      console.log('Order status updated:', data);
      updateOrderInStore(data.orderId, data.data);
    });

    // Initial fetch
    fetchOrders();

    return () => {
      socket.off('order:new-order-notification');
      socket.off('order:status-update');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, isConnected, currentPage]);

  return {
    fetchOrders,
    updateOrderStatus,
    isConnected,
  };
}
