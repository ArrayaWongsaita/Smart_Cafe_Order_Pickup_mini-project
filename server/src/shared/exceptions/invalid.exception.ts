import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/exceptions/base.exception';
import { ErrorTypes } from 'src/shared/types/error-types.type';
import { InvalidMessageEnumType } from 'src/shared/types/invalid-enum.type';

export class InvalidException extends BaseException {
  errorCode = ErrorTypes.InvalidInput;
  statusCode: number = HttpStatus.BAD_REQUEST;
  constructor(details: InvalidMessageEnumType) {
    super();
    this.details = details;
  }
}
