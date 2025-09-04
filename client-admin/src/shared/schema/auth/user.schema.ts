import { z } from 'zod';

export const RoleEnum = z.enum(['CUSTOMER', 'ADMIN', 'BARISTA']);

export const baseUserSchema = z.object({
  id: z.uuid('รหัสผู้ใช้ต้องเป็น UUID ที่ถูกต้อง'),
  email: z.email('รูปแบบอีเมลไม่ถูกต้อง').min(1, 'อีเมลจำเป็นต้องระบุ'),
  passwordHash: z.string().min(1, 'passwordHash จำเป็นต้องระบุ'),
  role: RoleEnum.default('CUSTOMER'),
  createdAt: z.iso.datetime().or(z.date()),
  updatedAt: z.iso.datetime().or(z.date()),
});

export const createUserSchema = z.object({
  email: z.email('รูปแบบอีเมลไม่ถูกต้อง').min(1, 'อีเมลจำเป็นต้องระบุ'),
  password: z.string().min(6, 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร'),
  role: RoleEnum.optional(),
});

// ใช้อัปเดต (password ไม่จำเป็น ถ้าใส่จะไป hash ภายหลัง)
export const updateUserSchema = createUserSchema.partial();

// สำหรับ login
export const loginUserSchema = z.object({
  email: z.email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z.string().min(1, 'รหัสผ่านจำเป็นต้องระบุ'),
});
