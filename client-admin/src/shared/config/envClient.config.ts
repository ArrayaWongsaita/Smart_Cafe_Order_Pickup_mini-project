import envClientSchema from '@/shared/schema/envClient.schema';

const env = {
  NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
};

const { success, data, error } = envClientSchema.safeParse(env);

if (!success) {
  console.error('Environment variables validation failed:', error);
  throw new Error('Invalid environment variables');
}

const envClientConfig = data;
export default envClientConfig;
