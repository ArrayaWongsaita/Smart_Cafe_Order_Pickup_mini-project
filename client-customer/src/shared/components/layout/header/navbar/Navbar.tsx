'use client';
import { usePathname } from 'next/navigation';
import { BookOpen, Video, Users } from 'lucide-react';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import { PUBLIC_ROUTE } from '@/shared/constants/route';
import { Session } from 'next-auth';

export default function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  return (
    <div className="  gap-4 text-white font-light md:flex hidden justify-center items-center">
      <NavItem
        href={PUBLIC_ROUTE.HOME}
        label="หน้าแรก"
        active={pathname === PUBLIC_ROUTE.HOME}
      />
    </div>
  );
}
