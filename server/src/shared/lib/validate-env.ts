import { envSchema } from 'src/shared/schemas/env.schema';
import * as z from 'zod';

export function validateEnv(config: unknown): Record<string, unknown> {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    const treeErrors = z.prettifyError(result.error);
    throw new Error('Invalid configuration: \n' + treeErrors);
  }
  return result.data;
}

export const createPortConfig = (): { port: number } => {
  const portSchema = z.object({
    PORT: z
      .string()
      .regex(/^\d+$/, 'Port must contain only digits (0-9)')
      .default('3000'),
  });

  const { PORT: port } = portSchema.parse({
    PORT: process.env.PORT,
  });

  return {
    port: Number(port),
  };
};
