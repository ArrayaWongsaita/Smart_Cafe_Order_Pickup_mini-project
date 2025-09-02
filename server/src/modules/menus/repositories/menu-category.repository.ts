import { Injectable } from '@nestjs/common';
import { MenuCategory } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IMenuCategoryRepository } from 'src/modules/menus/interfaces/menu-category.repository.interface';

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
}
