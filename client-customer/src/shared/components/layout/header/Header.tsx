import { Suspense } from 'react';
import HeaderWrapper from './HeaderWrapper';
import Logo from './Logo';
import Navbar from './navbar/Navbar';
import AuthButtonAndMobileMenu from '@/shared/components/layout/header/AuthButtonAndMobileMenu';

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo />
      <Navbar />
      <AuthButtonAndMobileMenu />
    </HeaderWrapper>
  );
}
