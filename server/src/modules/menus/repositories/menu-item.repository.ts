/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { MenuEntity } from '../entities/menu-item.entity';
import { IMenuItemRepository } from '../interfaces/menu-item.repository.interface';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Builder } from 'builder-pattern';

import { PaginationMetaDto } from 'src/shared/dtos/pagination.dto';
import { GetAllMenuDto } from 'src/modules/menus/dto/request/get-all-menu.dto';
import { GetAllMenuItemsResponse } from 'src/modules/menus/dto/response/get-all-menu-item.response';
import { Prisma } from '@prisma/client';

@Injectable()
export class MenuItemRepository implements IMenuItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<MenuEntity | null> {
    throw new Error('MenuItemRepository.findById not implemented');
  }

  findByName(name: string): Promise<MenuEntity | null> {
    throw new Error('MenuItemRepository.findByName not implemented');
  }

  async findAll(filter?: GetAllMenuDto): Promise<GetAllMenuItemsResponse> {
    const where: Prisma.MenuItemWhereInput = {};
    if (filter?.active !== undefined) where.active = filter.active;
    if (filter?.categoryId) where.categoryId = filter.categoryId;
    if (filter?.search) {
      const q = filter.search;
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    const page = filter?.page && filter.page > 0 ? Math.floor(filter.page) : 1;
    const limit =
      filter?.pageSize && filter.pageSize > 0
        ? Math.floor(filter.pageSize)
        : 20;
    const skip = (page - 1) * limit;

    const total = await this.prisma.menuItem.count({ where });

    const items = await this.prisma.menuItem.findMany({
      where,
      include: { category: true },
      orderBy: { name: 'asc' },
      skip,
      take: limit,
    });

    const data = items.map((item) =>
      Builder<MenuEntity>()
        .id(item.id)
        .name(item.name)
        .description(item.description ?? null)
        .price(item.price)
        .imageUrl(item.imageUrl ?? null)
        .active(item.active)
        .category(item.category ?? null)
        .createdAt(item.createdAt)
        .updatedAt(item.updatedAt)
        .build(),
    );

    const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;
    const meta: PaginationMetaDto = {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return { data, meta };
  }

  create(data: Partial<MenuEntity>): Promise<MenuEntity> {
    throw new Error('MenuItemRepository.create not implemented');
  }

  update(id: string, data: Partial<MenuEntity>): Promise<MenuEntity> {
    throw new Error('MenuItemRepository.update not implemented');
  }

  delete(id: string): Promise<void> {
    throw new Error('MenuItemRepository.delete not implemented');
  }
}
