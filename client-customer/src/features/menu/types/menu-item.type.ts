import {
  menuItemBaseSchema,
  MenuItemsWithPagination,
} from '@/features/menu/schemas/menu-item.schema';
import { PaginationMeta } from '@/shared/types';
import z from 'zod';

export type MenuItem = z.infer<typeof menuItemBaseSchema>;

export type MenuItemsWithPagination = z.infer<typeof MenuItemsWithPagination>;
