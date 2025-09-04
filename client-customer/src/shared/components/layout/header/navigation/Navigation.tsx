'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, Search } from 'lucide-react';

import { PUBLIC_ROUTE } from '@/shared/constants/route';
import SideNavItem from '../SideNavItem';
import AuthButtons from '@/shared/components/layout/header/AuthButtons';
import { Session } from 'next-auth';

export default function Navigation({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full max-w-md mx-auto border border-slate-200 rounded-lg shadow-sm bg-white font-sans">
      {/* Main Navigation */}
      <nav className="flex flex-col w-full gap-2 p-4">
        {/* Home */}
        <SideNavItem
          href={PUBLIC_ROUTE.HOME}
          icon={<Home className="w-5 h-5 text-emerald-600" />}
          label="หน้าแรก"
          active={pathname === PUBLIC_ROUTE.HOME}
        />

        {/* Menu */}
        <SideNavItem
          href={PUBLIC_ROUTE.MENU(1)}
          icon={<UtensilsCrossed className="w-5 h-5 text-amber-600" />}
          label="เมนู"
          active={pathname === PUBLIC_ROUTE.MENU(1)}
        />

        {/* Search Order */}
        <SideNavItem
          href={PUBLIC_ROUTE.SEARCH_ORDER}
          icon={<Search className="w-5 h-5 text-blue-600" />}
          label="ค้นหาคำสั่งซื้อ"
          active={pathname === PUBLIC_ROUTE.SEARCH_ORDER}
        />
      </nav>

      {/* Auth Buttons */}
      <div className="px-4 pb-4 border-t border-slate-100 pt-4">
        <AuthButtons isMobile={true} session={session} />
      </div>
    </div>
  );
}
