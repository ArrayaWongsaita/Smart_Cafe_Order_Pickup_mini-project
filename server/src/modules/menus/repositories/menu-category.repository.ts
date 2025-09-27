import { Injectable } from '@nestjs/common';
import { MenuCategory } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IMenuCategoryRepository } from 'src/modules/menus/interfaces/menu-category.repository.interface';
import { CreateMenuCategoryDto } from '../dto/request/create-menu-category.dto';

@Injectable()
export class MenuCategoryRepository implements IMenuCategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<MenuCategory[]> {
    return this.prismaService.menuCategory.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async create(data: CreateMenuCategoryDto): Promise<MenuCategory> {
    return this.prismaService.menuCategory.create({
      data: {
        name: data.name,
        sortOrder: data.sortOrder ?? 0,
      },
    });
  }
}
