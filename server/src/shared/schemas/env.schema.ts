import { z } from 'zod';

const baseEnvSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535),
  // DATABASE_URL: z.url(),
});

export const jwtEnvSchema = z.object({
  JWT_ACCESS_TOKEN_SECRET: z.string().default('defaultAccess'),
  JWT_REFRESH_TOKEN_SECRET: z.string().default('defaultRefresh'),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
});

export const envSchema = baseEnvSchema.extend(jwtEnvSchema.shape);
