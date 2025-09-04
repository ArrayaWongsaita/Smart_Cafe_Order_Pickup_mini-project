'use client';

import { useSocket } from '@/shared/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isConnected, connect, disconnect, isCallingToConnect } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected && !isCallingToConnect) {
      connect(router);
    }
    return () => {
      if (isConnected && !isCallingToConnect) {
        disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, connect, disconnect, isCallingToConnect]);

  if (!isConnected) {
    return null;
  }
  return <>{children}</>;
}
