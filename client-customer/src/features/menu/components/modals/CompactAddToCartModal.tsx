'use client';

import { useState, useRef } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { MenuItem } from '@/features/menu/types';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { cartService } from '@/features/cart/services';
import { useFlyToCartAnimation } from '@/features/cart/animations';
import { formatPrice } from '@/shared/utils/formatPrice.util';
import Image from 'next/image';

interface CompactAddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem;
}

export function CompactAddToCartModal({
  isOpen,
  onClose,
  menuItem,
}: CompactAddToCartModalProps) {
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
      setQuantity(1);

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
    setQuantity(1);
  };

  const totalPrice = menuItem.price * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>เพิ่มลงตะกร้า</span>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Info */}
          <div className="flex items-center space-x-3">
            <Image
              src={menuItem.imageUrl}
              alt={menuItem.name}
              className="w-16 h-16 object-cover rounded"
              width={64}
              height={64}
            />
            <div className="flex-1">
              <h3 className="font-medium">{menuItem.name}</h3>
              <p className="text-primary font-semibold">
                {formatPrice(menuItem.price)}
              </p>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <span className="font-medium">จำนวน:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="text-lg font-semibold min-w-[2rem] text-center">
                {quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t pt-3">
            <span className="font-semibold">รวม:</span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1"
            >
              ยกเลิก
            </Button>
            <Button
              ref={confirmButtonRef}
              onClick={handleConfirm}
              disabled={isLoading || !menuItem.active}
              className="flex-1"
            >
              {isLoading ? 'กำลังเพิ่ม...' : 'ยืนยัน'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
