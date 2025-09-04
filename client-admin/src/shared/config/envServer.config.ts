import envServerSchema from '@/shared/schema/envServer.schema';

const env = {
  API_BASE_URL: process.env.API_BASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
};

const { success, data, error } = envServerSchema.safeParse(env);

if (!success) {
  console.error('Environment variables validation failed:', error);
  throw new Error('Invalid environment variables');
}

const envServerConfig = data;
export default envServerConfig;
