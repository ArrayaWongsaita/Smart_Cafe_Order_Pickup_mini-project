'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';

import { PUBLIC_ROUTE } from '@/shared/constants/route';
// import AuthButtons from '../AuthButtons';
import SideNavItem from '../SideNavItem';

import AuthButtons from '@/shared/components/layout/header/AuthButtons';
import { Session } from 'next-auth';

export default function CourseNavigation({
  session,
}: {
  session: Session | null;
}) {
  const pathname = usePathname();

  return (
    <div className="flex  flex-col w-full max-w-md mx-auto border font-sans">
      {/* Main Navigation */}
      <nav className="flex flex-col w-full gap-4 p-4">
        {/* Home */}
        <SideNavItem
          href={PUBLIC_ROUTE.HOME}
          icon={<Home className="w-6 ml-4 h-6 text-primary" />}
          label="หน้าแรก"
          active={pathname === PUBLIC_ROUTE.HOME}
        />
      </nav>
      <div className="px-4">
        <AuthButtons isMobile={true} session={session} />
      </div>
    </div>
  );
}
