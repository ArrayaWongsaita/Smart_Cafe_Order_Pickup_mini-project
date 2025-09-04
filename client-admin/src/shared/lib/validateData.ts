import { ZodError, type ZodSchema, type ZodIssue } from 'zod';

interface ValidationErrorDetail {
  field: string;
  message: string;
  code: string;
  received?: unknown;
}

export class ValidationError extends Error {
  public errors: ValidationErrorDetail[];

  constructor(errors: ValidationErrorDetail[]) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

// Helper function สำหรับ validate data
export function validateData<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors: ValidationErrorDetail[] = error.issues.map(
        (err: ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
          received: 'received' in err ? err.received : undefined,
        })
      );

      console.log(validationErrors);

      throw new ValidationError(validationErrors);
    }
    throw error;
  }
}
