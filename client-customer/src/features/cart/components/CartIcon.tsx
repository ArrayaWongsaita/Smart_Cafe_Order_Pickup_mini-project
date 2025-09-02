'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useCartStore } from '../store';
import { useState, useEffect } from 'react';

interface CartIconProps {
  onClick?: () => void;
  className?: string;
}

export function CartIcon({ onClick, className }: CartIconProps) {
  const { getTotalItems } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Prevent hydration mismatch by only showing cart count after client hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const totalItems = getTotalItems();

  return (
    <Button
      variant="outline"
      size="icon"
      className={`relative ${className}`}
      onClick={onClick}
      data-cart-button="true"
    >
      <ShoppingCart className="h-4 w-4" />
      {isHydrated && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Button>
  );
}
