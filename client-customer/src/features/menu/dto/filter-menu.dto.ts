import z from 'zod';

export const filterMenuSchema = z.object({
  active: z.enum(['true', 'false']).optional(),
  categoryId: z.string().optional(),
  search: z.string().min(1).max(100).optional(),
  page: z
    .string()
    .regex(/^\d+$/, { message: 'ต้องเป็นตัวเลขเท่านั้น' })
    .min(1)
    .max(100)
    .optional(),
  pageSize: z
    .string()
    .regex(/^\d+$/, { message: 'ต้องเป็นตัวเลขเท่านั้น' })
    .min(1)
    .max(100)
    .default('6')
    .optional(),
});

export type FilterMenuDto = z.infer<typeof filterMenuSchema>;
