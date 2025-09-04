import z from 'zod';

const envServerSchema = z.object({
  API_BASE_URL: z.url(),
  AUTH_SECRET: z.string().min(32).max(100).default('your_auth_secret'),
});

export default envServerSchema;
