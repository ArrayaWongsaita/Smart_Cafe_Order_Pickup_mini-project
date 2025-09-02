import { ZodError, type ZodSchema } from 'zod';

export class ValidationError extends Error {
  public errors: any[];

  constructor(errors: any[]) {
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
      const validationErrors = error.issues.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
        received: err.received,
      }));

      console.log(validationErrors);

      throw new ValidationError(validationErrors);
    }
    throw error;
  }
}
