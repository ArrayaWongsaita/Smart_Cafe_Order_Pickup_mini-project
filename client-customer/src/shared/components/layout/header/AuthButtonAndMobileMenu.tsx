import AuthButtons from '@/shared/components/layout/header/AuthButtons';
import MobileMenuToggle from '@/shared/components/layout/header/navigation/MobileMenuToggle';
import { auth } from '@/shared/lib';
import { Suspense } from 'react';
import AuthButtonAndMobileMenuSkeleton from './AuthButtonAndMobileMenu.skeleton';
import { ModeToggle } from '@/shared/components/ui/ThemeButton';

// Async component for loading auth content
async function AuthButtonContent() {
  const session = await auth();
  return (
    <>
      <AuthButtons session={session} />
      <MobileMenuToggle session={session} className="md:hidden text-white" />
    </>
  );
}

export default function AuthButtonAndMobileMenu() {
  return (
    <div className="flex items-center gap-4">
      <ModeToggle />
      <Suspense fallback={<AuthButtonAndMobileMenuSkeleton />}>
        <AuthButtonContent />
      </Suspense>
    </div>
  );
}
