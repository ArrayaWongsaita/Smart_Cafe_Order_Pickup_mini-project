import { MenuCategory } from '@prisma/client';
import { CreateMenuCategoryDto } from '../dto/request/create-menu-category.dto';

export interface IMenuCategoryRepository {
  findAll(): Promise<MenuCategory[]>;
  create(data: CreateMenuCategoryDto): Promise<MenuCategory>;
}

export const IMenuCategoryRepositoryToken = Symbol('IMenuCategoryRepository');
