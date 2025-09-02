'use client';

import { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '@/features/menu/types';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { cartService } from '@/features/cart/services';
import { useFlyToCartAnimation } from '@/features/cart/animations';
import { formatPrice } from '@/shared/utils/formatPrice.util';
import Image from 'next/image';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem;
}

export function AddToCartModal({
  isOpen,
  onClose,
  menuItem,
}: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const { playAnimationFromPosition } = useFlyToCartAnimation();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);

      // Store button position before closing modal
      const buttonPosition = { x: 0, y: 0 };
      if (confirmButtonRef.current) {
        const rect = confirmButtonRef.current.getBoundingClientRect();
        buttonPosition.x = rect.left + rect.width / 2;
        buttonPosition.y = rect.top + rect.height / 2;
      }

      // Close modal first
      onClose();
      setQuantity(1); // Reset quantity for next time

      // Add to cart
      await cartService.addToCart.execute(menuItem, quantity);

      // Play animation after modal is closed
      setTimeout(() => {
        playAnimationFromPosition(buttonPosition.x, buttonPosition.y, () => {
          // Animation completed
        });
      }, 100); // Small delay to ensure modal is fully closed
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    setQuantity(1); // Reset quantity
  };

  const totalPrice = menuItem.price * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>เพิ่มลงตะกร้า</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Image */}
          <div className="flex justify-center">
            <Image
              src={menuItem.imageUrl}
              alt={menuItem.name}
              className="w-32 h-32 object-cover rounded-lg"
              width={128}
              height={128}
            />
          </div>

          {/* Product Details */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">{menuItem.name}</h3>
            {menuItem.description && (
              <p className="text-gray-600 text-sm">{menuItem.description}</p>
            )}
            <p className="text-lg font-medium text-primary">
              {formatPrice(menuItem.price)}
            </p>
            {menuItem.category && (
              <p className="text-xs text-gray-500">
                หมวดหมู่: {menuItem.category.name}
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">จำนวน:</label>
            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="text-xl font-semibold min-w-[3rem] text-center">
                {quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium dark:text-primary-foreground">
                ราคารวม:
              </span>
              <span className="text-xl font-bold text-primary">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            ยกเลิก
          </Button>
          <Button
            ref={confirmButtonRef}
            onClick={handleConfirm}
            disabled={isLoading || !menuItem.active}
            className="w-full sm:w-auto"
          >
            {isLoading ? 'กำลังเพิ่ม...' : `เพิ่มลงตะกร้า (${quantity})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
