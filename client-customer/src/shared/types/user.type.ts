import {
  baseUserSchema,
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
  RoleEnum,
} from '@/shared/schema/auth/user.schema';
import { z } from 'zod';

// User types
export type User = z.infer<typeof baseUserSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type Role = z.infer<typeof RoleEnum>;
