// import { AUTH_ROUTE } from '@/constants/route';
'use client';
import { signOutUser } from '@/features/auth/lib/action/auth.action';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import { PUBLIC_ROUTE } from '@/shared/constants';
import { LogIn, LogOut } from 'lucide-react';
import { Session } from 'next-auth';

export default function AuthButtons({
  session,
  isMobile = false,
}: {
  session: Session | null;
  isMobile?: boolean;
}) {
  return (
    <div
      className={
        'md:flex justify-center gap-4 items-center ' +
        (isMobile ? '' : 'hidden')
      }
    >
      {session?.user ? (
        <div className="h-8 px-4 py-[18px] hover:bg-primary-purple-dark active:scale-105 text-sm flex justify-center items-center bg-primary-foreground border rounded-full">
          <TransitionLink
            href={PUBLIC_ROUTE.SIGN_OUT}
            className="flex items-center justify-center w-full gap-1 py-3 text-primary"
          >
            <span>ออกจากระบบ</span>
            <div className="bg-primary rounded-full p-1 flex justify-center items-center">
              <LogOut className="w-4 h-4 text-white" />
            </div>
          </TransitionLink>
        </div>
      ) : (
        <div className="h-8 px-4 py-[18px] hover:bg-primary-purple-disabled text-sm flex justify-center items-center bg-primary-foreground rounded-full">
          <TransitionLink
            href={PUBLIC_ROUTE.SIGN_IN}
            className="flex items-center justify-center w-full gap-1 py-3 text-primary"
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
