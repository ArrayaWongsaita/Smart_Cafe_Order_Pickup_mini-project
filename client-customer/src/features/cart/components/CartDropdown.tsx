'use client';

import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { useCartStore } from '../store';
import { cartService } from '../services';
import { formatPrice } from '@/shared/utils/formatPrice.util';
import Image from 'next/image';

interface CartDropdownProps {
  onClose?: () => void;
  onCheckout?: () => void;
}

export function CartDropdown({ onClose, onCheckout }: CartDropdownProps) {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        await cartService.removeFromCart.execute(itemId);
      } else {
        await cartService.updateQuantity.execute(itemId, newQuantity);
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await cartService.removeFromCart.execute(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await cartService.clearCart.execute();
      onClose?.();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handleCheckout = () => {
    onCheckout?.();
    onClose?.();
  };

  return (
    <Card className="border-0 shadow-none">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">ตระกร้าสินค้า</h3>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              ล้างทั้งหมด
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>ตระกร้าของคุณว่างเปล่า</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="max-h-60 overflow-y-auto space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-2 border rounded-lg"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                    width={48}
                    height={48}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="text-sm font-medium min-w-[2rem] text-center">
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 mt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">รวมทั้งหมด:</span>
                <span className="font-bold text-lg">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <Button className="w-full" onClick={handleCheckout}>
                ดำเนินการสั่งซื้อ ({totalItems} รายการ)
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
