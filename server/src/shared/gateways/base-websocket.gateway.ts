import { UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TokenService } from 'src/modules/auth/providers/token.service';
import { SocketExceptionFilter } from 'src/shared/filters/socketException.filter';

@UseFilters(new SocketExceptionFilter())
export abstract class BaseWebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly tokenService: TokenService) {}
  protected server: Server;

  afterInit(server: Server) {
    this.server = server;
    console.log('✅ Socket.IO initialized');
  }

  async handleConnection(client: Socket) {
    console.log(`📡 Client connected: ${client.id}`);

    const token = client.handshake.auth?.token;

    if (token && typeof token === 'string') {
      try {
        const payload = await this.tokenService.verifyAccessToken(token);
        if (payload) {
          client.user = payload;
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client disconnected: ${client.id}`);
  }
}
