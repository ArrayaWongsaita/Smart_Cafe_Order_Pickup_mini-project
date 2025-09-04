import z from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url().default('http://localhost:8000'),
  NEXT_PUBLIC_SOCKET_URL: z.url().default('http://localhost:8000'),
  AUTH_SECRET: z.string().min(32).max(100).default('your_auth_secret'),
});

export default envSchema;
