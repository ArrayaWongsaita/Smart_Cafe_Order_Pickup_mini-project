import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { customFetch } from './fetch.config';
import { jwtDecode } from 'jwt-decode';
import { JWT } from 'next-auth/jwt';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await customFetch<{
      accessToken: string;
      refreshToken: string;
    }>('/v1/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh_token: token.refreshToken,
      }),
    });

    const accessTokenDecoded = jwtDecode<{ exp: number }>(response.accessToken);

    const accessTokenExpires = accessTokenDecoded.exp
      ? Math.floor(accessTokenDecoded.exp * 1000 - 1000)
      : 0;

    const refreshTokenDecoded = jwtDecode<{ exp: number }>(
      response.refreshToken
    );

    const refreshTokenExpires = refreshTokenDecoded.exp
      ? Math.floor(refreshTokenDecoded.exp * 1000 - 1000)
      : 0;

    return {
      ...token,
      accessToken: response.accessToken,
      accessTokenExpires: accessTokenExpires ?? token.accessTokenExpires,
      refreshToken: response.refreshToken ?? token.refreshToken,
      refreshTokenExpires: refreshTokenExpires ?? token.refreshTokenExpires,
    };
  } catch (error) {
    console.error('Refresh token error', error);
    return {
      ...token,
      error: {
        accessToken: true,
      },
    };
  }
}

import { signInSchema } from '@/shared/schema/auth/auth.schema';
import { Role } from '@/shared/types/user.type';

interface UserResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: Role;
    image?: string | null;
  };
}

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/error',
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const data = signInSchema.parse(credentials);
        console.log('Authorize called with data:', data);

        // Define response type explicitly

        const response = await customFetch<UserResponse>('/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response) {
          throw new Error('Invalid email or password');
        }
        const accessTokenDecoded = jwtDecode<{ exp: number }>(
          response.accessToken
        );

        const accessTokenExpires = accessTokenDecoded.exp
          ? Math.floor(accessTokenDecoded.exp * 1000 - 1000)
          : 0;

        const refreshTokenDecoded = jwtDecode<{ exp: number }>(
          response.refreshToken
        );

        const refreshTokenExpires = refreshTokenDecoded.exp
          ? Math.floor(refreshTokenDecoded.exp * 1000 - 1000)
          : 0;

        // Return user object with proper properties - map username to name for NextAuth compatibility
        return {
          id: response.user.id,
          email: response.user.email,
          name: response.user.username,
          image: response.user.image,
          role: response.user.role,
          accessToken: response.accessToken,
          accessTokenExpires,
          refreshToken: response.refreshToken,
          refreshTokenExpires,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial login
      if (user) {
        token = { ...token, ...user };
        return token;
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token expired, try to update it
      if (token.refreshTokenExpires && Date.now() > token.refreshTokenExpires) {
        return {
          ...token,
          error: {
            refreshToken: true,
          },
        };
      }

      return await refreshAccessToken(token);
    },
    session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.role = token.role;
        session.token = {
          accessToken: token.accessToken,
          accessTokenExpires: token.accessTokenExpires,
          refreshToken: token.refreshToken,
          refreshTokenExpires: token.refreshTokenExpires,
        };
        if (token.error) {
          session.error = {
            accessToken: token.error?.accessToken || false,
            refreshToken: token.error?.refreshToken || false,
          };
        }
      }
      return session;
    },
  },
};
