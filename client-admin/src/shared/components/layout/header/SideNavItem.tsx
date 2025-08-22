'use client';

import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import { cn } from '@/shared/lib/utils';

interface SideNavItemProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function SideNavItem({
  href,
  icon,
  label,
  active = false,
}: SideNavItemProps) {
  return (
    <TransitionLink
      href={href}
      className={cn(
        'flex items-center gap-3 py-2 text-lg font-medium',
        active && 'bg-gray-300 rounded-full px-4'
      )}
    >
      {icon}
      <span>{label}</span>
    </TransitionLink>
  );
}
