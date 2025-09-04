'use client';

import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import { cn } from '@/shared/lib/utils';

interface NavItemProps {
  href: string;
  label: string;
  active: boolean;
}

export default function NavItem({ href, label, active }: NavItemProps) {
  return (
    <TransitionLink
      href={href}
      className="relative dark:bg-secondary rounded-full"
    >
      <div
        className={cn(
          'text-white font-light  hover:text-gray-200 transition-colors px-3 py-2 relative',
          active && 'font-normal' // Make active text slightly bolder
        )}
      >
        {label}
        {active && (
          <div
            className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-white dark:bg-secondary"
            style={{ boxShadow: '0px -1px 20px rgba(255,255,255,0.3)' }}
          />
        )}
      </div>
    </TransitionLink>
  );
}
