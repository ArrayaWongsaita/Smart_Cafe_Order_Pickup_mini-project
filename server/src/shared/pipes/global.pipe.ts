import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from 'src/shared/exceptions/validation.exception';

const globalPipes = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  exceptionFactory: (errors) => {
    const details = errors.reduce((acc, error) => {
      acc[error.property] = Object.values(error.constraints || {});
      return acc;
    }, {});
    return new ValidationException(details);
  },
});

export default globalPipes;
