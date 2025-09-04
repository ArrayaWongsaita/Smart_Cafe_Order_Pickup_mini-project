import { baseUserSchema } from '@/shared/schema/auth/user.schema';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: z
      .string()
      .regex(
        /^[a-zA-Z0-9]{6,}$/,
        'Password must have at least 6 characters and contains only letter and number'
      ),
    confirmPassword: z
      .string()
      .regex(
        /^[a-zA-Z0-9]{6,}$/,
        'Confirm password must have at least 6 characters and contains only letter and number'
      ),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password and confirm password didn't match",
    path: ['confirmPassword'],
  });

/* eslint-disable @typescript-eslint/no-unused-vars */
export const signUpExcludeConfirmSchema = signUpSchema.transform(
  ({ confirmPassword, ...rest }) => rest
);

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const authUserSchema = z.looseObject({
  user: baseUserSchema
    .pick({
      id: true,
      email: true,
      role: true,
    })
    .passthrough(),
  token: z.object({
    accessToken: z.string(),
    accessTokenExpires: z.number(),
    refreshToken: z.string(),
    refreshTokenExpires: z.number(),
  }),
  error: z
    .object({
      accessToken: z.boolean().optional(),
      refreshToken: z.boolean().optional(),
    })
    .optional(),
});
