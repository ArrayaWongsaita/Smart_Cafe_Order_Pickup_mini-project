import { customFetch } from '@/shared/config/fetch.config';
import { CreateUser } from '@/shared/types/user.type';
import { jwtDecode } from 'jwt-decode';
import { JWT } from 'next-auth/jwt';

export async function registerUser(params: CreateUser) {
  return customFetch<string>('/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
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
