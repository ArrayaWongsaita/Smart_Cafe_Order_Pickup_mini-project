'use server';

import { registerUserUseCase } from '@/features/auth/use-case/register.usecase';
import { PUBLIC_ROUTE } from '@/shared/constants';
import { signIn, signOut } from '@/shared/lib/auth';
import { HttpError } from '@/shared/lib/error';
import { signUpExcludeConfirmSchema } from '@/shared/schema/auth/auth.schema';

import { ActionResult } from '@/shared/types';
import { revalidatePath } from 'next/cache';

export async function signUpCredentials(
  rawData: unknown
): Promise<ActionResult> {
  const { data, error, success } =
    signUpExcludeConfirmSchema.safeParse(rawData);
  if (!success) {
    return {
      success: false,
      message: 'Validation error',
      error: error.flatten().fieldErrors,
    };
  }

  try {
    await registerUserUseCase.execute(data);
    return { success: true, message: 'User created successfully' };
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      return {
        success: false,
        message: 'Failed to create user',
        error: error.data,
      };
    }
    return {
      success: false,
      message: 'internal server error',
    };
  }
}

export async function signInCredentials(
  data: Record<string, string>
): Promise<ActionResult> {
  try {
    await signIn('credentials', { ...data, redirect: false });
    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    console.error('signIn error:', error);
    return {
      success: false,
      message: 'Failed to sign in',
      error: { general: ['An error occurred during sign-in'] },
    };
  }
}

export async function signOutUser() {
  await signOut({ redirect: true, redirectTo: PUBLIC_ROUTE.HOME });
}
