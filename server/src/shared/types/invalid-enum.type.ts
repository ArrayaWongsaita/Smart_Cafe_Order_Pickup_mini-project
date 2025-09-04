export enum InvalidMessageEnumType {
  // token and refresh token errors
  TOKEN_NOT_PROVIDED = 'Token not provided',
  REFRESH_TOKEN_NOT_PROVIDED = 'Refresh token not provided',
  INVALID_REFRESH = 'Invalid refresh token provided',
  INVALID_TOKEN = 'Invalid token provided',
  EXPIRED_TOKEN = 'Token has expired',

  INVALID_EMAIL = 'Invalid email format',
  INVALID_PASSWORD = 'Password must be at least 8 characters long',
  INVALID_USERNAME = 'Username must be between 3 and 20 characters long',
  INVALID_PHONE_NUMBER = 'Invalid phone number format',
  INVALID_DATE = 'Invalid date format',
  INVALID_URL = 'Invalid URL format',
  INVALID_CURRENCY = 'Invalid currency format',
  INVALID_UUID = 'Invalid UUID format',
  INVALID_ENUM_VALUE = 'Invalid enum value provided',
  INVALID_JSON = 'Invalid JSON format provided',
  INVALID_FILE_TYPE = 'Invalid file type provided',
  INVALID_FILE_SIZE = 'File size exceeds the allowed limit',
}
