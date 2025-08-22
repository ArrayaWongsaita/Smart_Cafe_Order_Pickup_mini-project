import 'next-auth/jwt';
import 'next-auth';
import { ROLE } from '@/shared/constants/role';
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: ROLE;

    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    refreshTokenExpires: number;

    error?: {
      accessToken?: boolean;
      refreshToken?: boolean;
    };
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: ROLE;
    };
    token: {
      accessToken: string;
      accessTokenExpires: number;
      refreshToken: string;
      refreshTokenExpires: number;
    };
    error?: {
      accessToken?: boolean;
      refreshToken?: boolean;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: ROLE;
  }
}
