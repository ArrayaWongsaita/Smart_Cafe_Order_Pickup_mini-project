import { registerAs } from '@nestjs/config';
import { jwtEnvSchema } from 'src/shared/schemas/env.schema';
import z from 'zod';

export default registerAs('jwt', () => {
  const { success, data, error } = jwtEnvSchema.safeParse(process.env);
  if (!success) {
    console.error('JWT Config validation error:', z.prettifyError(error));
    throw new Error('Invalid JWT configuration');
  }
  return {
    accessTokenSecret: data.JWT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: data.JWT_REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: data.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: data.JWT_REFRESH_TOKEN_EXPIRES_IN,
  };
});
