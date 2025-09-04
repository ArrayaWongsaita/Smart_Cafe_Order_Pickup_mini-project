'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import { cn } from '@/shared/lib/utils';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';

interface MobileMenuToggleProps {
  session: Session | null;
  className?: string;
}

export default function MobileMenuToggle({
  className,
  session,
}: MobileMenuToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Menu Toggle Button */}
      <div className="relative">
        <button
          onClick={toggleMenu}
          className={cn('p-2 focus:outline-hidden', className)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation Sidebar */}
        {isOpen && (
          <div className="fixed top-14 bg-secondary w-screen inset-0 z-40 flex  ">
            <Navigation session={session} />
          </div>
        )}
      </div>
    </>
  );
}
