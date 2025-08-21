import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from 'src/shared/exceptions/base.exception';

@Catch(BaseException)
export class GlobalFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    const status = exception.statusCode || 500;
    const errorCode = exception.errorCode || 'INTERNAL_SERVER_ERROR';

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      statusCode: status,
      errorCode,
      details: exception.details || null,
      path: request.path,
    });
  }
}
