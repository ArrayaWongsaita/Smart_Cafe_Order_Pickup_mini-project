import { Catch, ArgumentsHost, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class SocketExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const event = host.switchToWs().getPattern();

    client.emit('validation_error', {
      event,
      message: exception.getError(),
      timestamp: new Date().toISOString(),
    });
  }
}
