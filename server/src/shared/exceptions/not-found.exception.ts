import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/exceptions/base.exception';
import { ErrorTypes } from 'src/shared/types/error-types.type';

export class NotFoundException extends BaseException {
  errorCode = ErrorTypes.NotFound;
  statusCode: number = HttpStatus.NOT_FOUND;
  constructor(details: string) {
    super();
    this.details = details;
  }
}
