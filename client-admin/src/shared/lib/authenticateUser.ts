import { PUBLIC_ROUTE } from '@/shared/constants';
import { auth } from '@/shared/lib/auth';
import { authUserSchema } from '@/shared/schema/auth/auth.schema';
import { AuthUser } from '@/shared/types';
import { redirect } from 'next/navigation';

export async function authenticateUser(): Promise<AuthUser> {
  const session = await auth();

  if (!session) redirect(PUBLIC_ROUTE.SIGN_IN);

  const result = authUserSchema.safeParse(session);

  if (!result.success) {
    console.error('Authentication error:', result.error);
    redirect(PUBLIC_ROUTE.SIGN_IN);
  }

  return result.data;
}
