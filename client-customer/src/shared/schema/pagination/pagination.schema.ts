import z from 'zod';

export const paginationSchema = z.object({
  total: z.number().min(0),
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});
