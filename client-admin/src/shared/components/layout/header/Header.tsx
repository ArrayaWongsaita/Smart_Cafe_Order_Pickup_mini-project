import HeaderWrapper from './HeaderWrapper';
import Logo from './Logo';
import Navbar from './navbar/Navbar';
import AuthButtons from './AuthButtons';
import MobileMenuToggle from '@/shared/components/layout/header/navigation/MobileMenuToggle';
import { Session } from 'next-auth';

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session }: HeaderProps) {
  return (
    <HeaderWrapper>
      <Logo />
      <Navbar session={session} />
      <div>
        <AuthButtons session={session} />
        <MobileMenuToggle session={session} className="md:hidden text-white" />
      </div>
    </HeaderWrapper>
  );
}
