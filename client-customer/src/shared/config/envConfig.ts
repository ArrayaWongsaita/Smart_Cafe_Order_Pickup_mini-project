import envSchema from '@/shared/schema/env.schema';

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error('Environment variables validation failed:', error);
  throw new Error('Invalid environment variables');
}

const envConfig = data;
export default envConfig;
