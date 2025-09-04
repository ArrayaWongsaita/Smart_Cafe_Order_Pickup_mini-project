import { ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export const WebSocketValidationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  exceptionFactory: (errors) => {
    const details = errors.reduce((acc, error) => {
      acc[error.property] = Object.values(error.constraints || {});
      return acc;
    }, {});

    return new WsException(`Validation failed: ${JSON.stringify(details)}`);
  },
});
