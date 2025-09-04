import { paginationSchema } from '@/shared/schema';
import z from 'zod';

export const categorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  sortOrder: z.number().int(),
  createdAt: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: 'Invalid ISO date',
  }),
  updatedAt: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: 'Invalid ISO date',
  }),
});

export const menuItemBaseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().int(),
  imageUrl: z.url(),
  active: z.boolean(),
  category: categorySchema.nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const MenuItemsWithPagination = z.object({
  data: z.array(menuItemBaseSchema),
  meta: paginationSchema,
});
