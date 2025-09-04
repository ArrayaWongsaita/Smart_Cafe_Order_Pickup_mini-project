// import { AUTH_ROUTE } from '@/constants/route';
'use client';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import { PUBLIC_ROUTE } from '@/shared/constants';

import { LogIn, LogOut } from 'lucide-react';
import { Session } from 'next-auth';

export default function AuthButtons({
  isMobile = false,
  session,
}: {
  isMobile?: boolean;
  session: Session | null;
}) {
  return (
    <div
      className={
        'md:flex justify-center gap-4 items-center ' +
        (isMobile ? '' : 'hidden bg-primary')
      }
    >
      {session?.user ? (
        <div className="h-8 px-4 py-[18px] dark:bg-secondary hover:bg-primary active:scale-105 text-sm flex justify-center items-center bg-primary-foreground border rounded-full">
          <TransitionLink
            href={PUBLIC_ROUTE.SIGN_OUT}
            className="flex items-center justify-center w-full gap-1 py-3 text-secondary-foreground"
          >
            <span>ออกจากระบบ</span>
            <div className="bg-primary rounded-full p-1 flex justify-center items-center ">
              <LogOut className="w-4 h-4 text-white dark:text-secondary-foreground" />
            </div>
          </TransitionLink>
        </div>
      ) : (
        <div className="h-8 px-4 py-[18px] dark:bg-secondary hover:bg-primary-purple-disabled text-sm flex justify-center items-center bg-primary-foreground rounded-full">
          <TransitionLink
            href={PUBLIC_ROUTE.SIGN_IN}
            className="flex items-center  justify-center w-full gap-1 py-3 text-primary"
          >
            <span>เข้าสู่ระบบ</span>
            <div className="bg-primary rounded-full p-1 flex justify-center items-center">
              <LogIn className="w-4 h-4 text-white" />
            </div>
          </TransitionLink>
        </div>
      )}
    </div>
  );
}
