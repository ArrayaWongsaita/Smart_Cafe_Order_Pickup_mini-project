import { corsSchema } from 'src/shared/schemas/cors.schema';

const createCorsOptions = () => {
  const corsConfig = corsSchema.parse({
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    CORS_CREDENTIALS: process.env.CORS_CREDENTIALS,
    CORS_METHODS: process.env.CORS_METHODS,
    CORS_ALLOWED_HEADERS: process.env.CORS_ALLOWED_HEADERS,
  });

  return {
    origin:
      corsConfig.CORS_ORIGIN === '*' ? true : corsConfig.CORS_ORIGIN.split(','),
    methods: corsConfig.CORS_METHODS.split(','),
    allowedHeaders:
      corsConfig.CORS_ALLOWED_HEADERS === '*'
        ? '*'
        : corsConfig.CORS_ALLOWED_HEADERS.split(','),
    credentials: corsConfig.CORS_CREDENTIALS,
  };
};
export const corsOptions = createCorsOptions();
