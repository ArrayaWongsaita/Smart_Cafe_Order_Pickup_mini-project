'use client';

import { PUBLIC_ROUTE } from '@/shared/constants';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function page() {
  useEffect(() => {
    const signOutUser = async () => {
      await signOut({
        callbackUrl: PUBLIC_ROUTE.SIGN_IN,
      });
    };
    signOutUser();
  }, []);

  return <div></div>;
}
