'use client';
import React from 'react';

import AuthButtons from '@/shared/components/layout/header/AuthButtons';
import { Session } from 'next-auth';

export default function CourseNavigation({
  session,
}: {
  session: Session | null;
}) {
  return (
    <div className="flex  flex-col w-full max-w-md mx-auto border font-sans">
      {/* Main Navigation */}
      <nav className="flex flex-col w-full gap-4 p-4"></nav>
      <div className="px-4">
        <AuthButtons isMobile={true} session={session} />
      </div>
    </div>
  );
}
