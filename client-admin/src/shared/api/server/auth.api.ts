import { customFetch } from '@/shared/config/fetch.config';
import { CreateUser } from '@/shared/types/user.type';

export async function registerUser(params: CreateUser) {
  return customFetch<string>('/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
