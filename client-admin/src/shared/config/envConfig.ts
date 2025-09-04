import envSchema from '@/shared/schema/env.schema';

const env = {
  NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

const { success, data, error } = envSchema.safeParse(env);

if (!success) {
  console.error('Environment variables validation failed:', error);
  throw new Error('Invalid environment variables');
}

const envConfig = data;
export default envConfig;
