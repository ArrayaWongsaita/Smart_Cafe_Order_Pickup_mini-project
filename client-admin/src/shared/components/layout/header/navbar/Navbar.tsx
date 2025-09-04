'use client';
import { usePathname } from 'next/navigation';
import NavItem from './NavItem';
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from '@/shared/constants/route';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="  gap-4 text-white font-light md:flex hidden justify-center items-center">
      <NavItem
        href={PUBLIC_ROUTE.HOME}
        label="หน้าแรก"
        active={pathname === PUBLIC_ROUTE.HOME}
      />
      <NavItem
        href={PRIVATE_ROUTE.ORDERS(1)}
        label="คำสั่งซื้อ"
        active={pathname === PRIVATE_ROUTE.ORDERS(1)}
      />
    </div>
  );
}
