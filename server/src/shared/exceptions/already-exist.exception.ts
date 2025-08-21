import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/exceptions/base.exception';

import { ErrorTypes } from 'src/shared/types/error-types.type';

export class AlreadyExistException extends BaseException {
  errorCode = ErrorTypes.BadRequest;
  statusCode: number = HttpStatus.CONFLICT;
  constructor(details: string) {
    super();
    this.details = details;
  }
}
