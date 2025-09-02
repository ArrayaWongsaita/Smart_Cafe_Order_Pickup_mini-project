import { MenuCategory } from '@prisma/client';

export interface IMenuCategoryRepository {
  findAll(): Promise<MenuCategory[]>;
}

export const IMenuCategoryRepositoryToken = Symbol('IMenuCategoryRepository');
