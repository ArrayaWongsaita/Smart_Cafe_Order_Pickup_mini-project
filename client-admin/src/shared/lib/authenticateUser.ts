import { PUBLIC_ROUTE } from '@/shared/constants';
import { auth } from '@/shared/lib/auth';
import { authUserSchema } from '@/shared/schema/auth/auth.schema';
import { AuthUser } from '@/shared/types';
import { redirect } from 'next/navigation';

export async function authenticateUser(
  isCheckError: boolean = false
): Promise<AuthUser> {
  const session = await auth();

  if (!session) redirect(PUBLIC_ROUTE.SIGN_IN);

  if (session.error?.refreshToken && isCheckError)
    redirect(PUBLIC_ROUTE.SIGN_OUT);

  const result = authUserSchema.safeParse(session);

  if (!result.success) {
    console.error('Authentication error:', result.error);
    redirect(PUBLIC_ROUTE.SIGN_IN);
  }

  return result.data;
}
