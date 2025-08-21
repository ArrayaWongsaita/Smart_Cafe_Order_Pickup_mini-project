export enum ErrorTypes {
  // Common Errors
  NotFound = 'NotFound',
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  InternalServerError = 'InternalServerError',

  // Validation Errors
  ValidationError = 'ValidationError',
  InvalidInput = 'InvalidInput',
  MissingRequiredField = 'MissingRequiredField',
  InvalidFormat = 'InvalidFormat',
  DuplicateEntry = 'DuplicateEntry',

  // Authentication Errors
  AuthenticationFailed = 'AuthenticationFailed',
  TokenExpired = 'TokenExpired',
  InvalidCredentials = 'InvalidCredentials',

  // Authorization Errors
  AccessDenied = 'AccessDenied',
  // Database Errors
  DatabaseConnectionError = 'DatabaseConnectionError',
  RecordNotFound = 'RecordNotFound',
  QueryExecutionError = 'QueryExecutionError',
}
