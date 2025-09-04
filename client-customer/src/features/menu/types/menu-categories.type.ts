import {
  arrayMenuCategorySchema,
  menuCategorySchema,
} from '@/features/menu/schemas/menu-categories.schema';
import z from 'zod';

// Type exports
export type MenuCategory = z.infer<typeof menuCategorySchema>;
export type ArrayMenuCategory = z.infer<typeof arrayMenuCategorySchema>;
