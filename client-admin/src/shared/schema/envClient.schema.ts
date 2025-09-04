import z from 'zod';

const envClientSchema = z.object({
  NEXT_PUBLIC_SOCKET_URL: z.url(),
});

export default envClientSchema;
