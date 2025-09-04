'use client';

import { useNavigation } from '@/features/transitionNavigate/hooks/navigation';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface TransitionLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  children: React.ReactNode;
}

export default function TransitionLink({
  href,
  children,
  className = '',
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { TransitionNavigate } = useNavigation();

  const isActive = pathname === href;
  const combinedClass = className + (isActive ? ' active' : '');

  const handleClick = useCallback(async () => {
    TransitionNavigate(href, router, pathname);
  }, [TransitionNavigate, router, href, pathname]);

  return (
    <button className={combinedClass} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
}
