import { ACCESS_TOKEN_PAYLOAD } from 'src/modules/auth/types/payload.type';

declare module 'express' {
  interface Request {
    user?: ACCESS_TOKEN_PAYLOAD;
  }
}
