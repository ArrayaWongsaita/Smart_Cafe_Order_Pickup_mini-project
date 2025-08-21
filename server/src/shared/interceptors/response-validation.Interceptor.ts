import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ResponseValidationInterceptor<T extends object>
  implements NestInterceptor<any, T>
{
  constructor(private readonly dto: new () => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      switchMap(async (response) => {
        const transformed = plainToInstance(this.dto, response, {
          enableImplicitConversion: true,
        });

        const errors = await validate(transformed, {
          whitelist: true,
          forbidNonWhitelisted: false,
        });

        if (errors.length > 0) {
          throw new InternalServerErrorException({
            message: 'Response validation failed',
            errors,
          });
        }
        return transformed;
      }),
    );
  }
}
