import { ErrorTypes } from 'src/shared/types/error-types.type';

export abstract class BaseException extends Error {
  constructor(message: string = 'An error occurred') {
    super(message);
  }

  abstract errorCode: ErrorTypes;
  details?: any;
  abstract statusCode: number;
}
