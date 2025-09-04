import z from 'zod';

export const corsSchema = z.object({
  CORS_ORIGIN: z.string().default('*'),
  CORS_CREDENTIALS: z
    .string()
    .default('true')
    .transform((val) => val === 'true'),
  CORS_METHODS: z.string().default('GET,HEAD,PUT,PATCH,POST,DELETE'),
  CORS_ALLOWED_HEADERS: z.string().default('*'),
});
