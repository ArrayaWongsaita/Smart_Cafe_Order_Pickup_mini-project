import {
  GUEST_ONLY_ROUTE,
  PROTECTED_ROUTE,
  PUBLIC_ROUTE,
} from '@/shared/constants';
import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const { auth } = NextAuth({
  providers: [],
  callbacks: {
    authorized: ({ auth, request }) => {
      // console.log('Authorized middleware callback:', { auth, request });
      console.log('checking url in middleware:', request.nextUrl.pathname);
      console.log('Authorized middleware callback:', auth);
      const pathname = request.nextUrl.pathname;

      if (GUEST_ONLY_ROUTE.some((el) => el.test(pathname) && auth)) {
        return NextResponse.redirect(new URL('/', request.url));
      } else if (PROTECTED_ROUTE.some((el) => el.test(pathname)) && !auth) {
        return false;
      }
      return true;
    },
  },
});
export default auth;

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
