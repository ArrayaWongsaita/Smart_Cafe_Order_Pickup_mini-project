'use client';

import { PUBLIC_ROUTE } from '@/shared/constants';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // perform sign out and redirect to sign-in page
    void signOut({ callbackUrl: PUBLIC_ROUTE.SIGN_IN });
  }, []);
  return <></>;
}
