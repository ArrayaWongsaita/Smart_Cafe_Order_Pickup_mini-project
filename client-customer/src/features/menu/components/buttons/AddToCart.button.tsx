'use client';

import { useState } from 'react';
import { MenuItem } from '@/features/menu/types';
import { Button } from '@/shared/components/ui/button';
import { AddToCartModal } from '../modals/AddToCartModal';

interface AddToCartButtonProps {
  active: boolean;
  menuItem: MenuItem;
}

export default function AddToCartButton({
  active,
  menuItem,
}: AddToCartButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (active) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleAddToCart}
        disabled={!active}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
          active
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {active ? 'เพิ่มลงตะกร้า' : 'ไม่พร้อมจำหน่าย'}
      </Button>

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menuItem={menuItem}
      />
    </>
  );
}
