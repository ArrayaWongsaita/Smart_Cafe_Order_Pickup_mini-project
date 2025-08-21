import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/exceptions/base.exception';

import { ErrorTypes } from 'src/shared/types/error-types.type';

export class ValidationException extends BaseException {
  errorCode = ErrorTypes.ValidationError;
  statusCode: number = HttpStatus.BAD_REQUEST;
  constructor(details: unknown) {
    super();
    this.details = details;
  }
}
