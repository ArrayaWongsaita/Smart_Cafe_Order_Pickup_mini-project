import { z } from 'zod';

// Base schema for MenuCategory
export const menuCategorySchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be less than 100 characters'),
  sortOrder: z
    .number()
    .int()
    .min(0, 'Sort order must be a non-negative integer')
    .default(0),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const arrayMenuCategorySchema = z.array(menuCategorySchema);
