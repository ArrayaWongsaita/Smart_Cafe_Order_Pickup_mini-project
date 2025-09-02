'use client';

import { PUBLIC_ROUTE } from '@/shared/constants';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function page() {
  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ redirectTo: PUBLIC_ROUTE.SIGN_IN });
    };
    handleSignOut();
  }, []);
  return <></>;
}
