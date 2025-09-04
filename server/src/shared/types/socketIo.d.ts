import 'socket.io';
import { ACCESS_TOKEN_PAYLOAD } from 'src/modules/auth/types/payload.type';

declare module 'socket.io' {
  interface Socket {
    user?: ACCESS_TOKEN_PAYLOAD;
  }
}
