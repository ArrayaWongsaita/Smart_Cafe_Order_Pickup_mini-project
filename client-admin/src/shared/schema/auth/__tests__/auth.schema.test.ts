import { describe, it, expect } from 'vitest';
import { signInSchema, signUpSchema } from '../auth.schema';

describe('Auth Schemas', () => {
  describe('signInSchema', () => {
    it('should validate valid sign in data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = signInSchema.safeParse(validData);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject empty email', () => {
      const invalidData = {
        email: '',
        password: 'password123',
      };

      const result = signInSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is required');
        expect(result.error.issues[0].path).toEqual(['email']);
      }
    });

    it('should reject empty password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '',
      };

      const result = signInSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password is required');
        expect(result.error.issues[0].path).toEqual(['password']);
      }
    });

    it('should reject missing fields', () => {
      const invalidData = {};

      const result = signInSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
        const fieldNames = result.error.issues.map((issue) => issue.path[0]);
        expect(fieldNames).toContain('email');
        expect(fieldNames).toContain('password');
      }
    });
  });

  describe('signUpSchema', () => {
    it('should validate valid sign up data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const result = signUpSchema.safeParse(validData);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
        expect(result.error.issues[0].path).toEqual(['email']);
      }
    });

    it('should reject short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345', // less than 6 characters
        confirmPassword: '12345',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        const passwordError = result.error.issues.find(
          (issue) => issue.path[0] === 'password'
        );
        expect(passwordError?.message).toBe(
          'Password must have at least 6 characters and contains only letter and number'
        );
      }
    });

    it('should reject password with special characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password@123',
        confirmPassword: 'password@123',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        const passwordError = result.error.issues.find(
          (issue) => issue.path[0] === 'password'
        );
        expect(passwordError?.message).toBe(
          'Password must have at least 6 characters and contains only letter and number'
        );
      }
    });

    it('should reject mismatched passwords', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password456',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        const confirmPasswordError = result.error.issues.find(
          (issue) => issue.path[0] === 'confirmPassword'
        );
        expect(confirmPasswordError?.message).toBe(
          "Password and confirm password didn't match"
        );
      }
    });

    it('should accept valid alphanumeric password', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const result = signUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept password with only letters', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password',
        confirmPassword: 'password',
      };

      const result = signUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept password with only numbers', () => {
      const validData = {
        email: 'test@example.com',
        password: '123456',
        confirmPassword: '123456',
      };

      const result = signUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject confirmPassword with invalid format even if passwords match', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'pass@123', // Invalid format
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        const confirmPasswordError = result.error.issues.find(
          (issue) =>
            issue.path[0] === 'confirmPassword' &&
            issue.message.includes('must have at least 6 characters')
        );
        expect(confirmPasswordError).toBeDefined();
      }
    });
  });
});
