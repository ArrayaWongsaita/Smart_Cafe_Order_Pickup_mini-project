import z from 'zod';

export const filterMenuSchema = z.object({
  active: z.boolean().optional(),
  categoryId: z.string().min(2).max(100).optional(),
  search: z.string().min(2).max(100).optional(),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).optional().default(10),
});

export type FilterMenuDto = z.infer<typeof filterMenuSchema>;
