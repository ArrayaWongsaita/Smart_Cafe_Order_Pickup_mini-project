import { authUserSchema } from '@/shared/schema/auth/auth.schema';
import z from 'zod';

export type AuthUser = z.infer<typeof authUserSchema>;
