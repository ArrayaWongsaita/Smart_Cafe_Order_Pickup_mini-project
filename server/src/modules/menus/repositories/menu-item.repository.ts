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

  async findById(id: string): Promise<MenuEntity | null> {
    const item = await this.prisma.menuItem.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!item) {
      return null;
    }

    return Builder<MenuEntity>()
      .id(item.id)
      .name(item.name)
      .description(item.description)
      .price(item.price)
      .imageUrl(item.imageUrl)
      .active(item.active)
      .categoryId(item.categoryId)
      .category(item.category)
      .createdAt(item.createdAt)
      .updatedAt(item.updatedAt)
      .build();
  }

  async findByName(name: string): Promise<MenuEntity | null> {
    const item = await this.prisma.menuItem.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        active: true, // Only find active items
      },
      include: {
        category: true,
      },
    });

    if (!item) {
      return null;
    }

    return Builder<MenuEntity>()
      .id(item.id)
      .name(item.name)
      .description(item.description)
      .price(item.price)
      .imageUrl(item.imageUrl)
      .active(item.active)
      .categoryId(item.categoryId)
      .category(item.category)
      .createdAt(item.createdAt)
      .updatedAt(item.updatedAt)
      .build();
  }

  async findAll(filter?: GetAllMenuDto): Promise<GetAllMenuItemsResponse> {
    const where: Prisma.MenuItemWhereInput = {};
    if (filter?.active !== undefined) {
      where.active = filter.active;
    } else {
      where.active = true; // Default to only active items
    }
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

  async create(data: Partial<MenuEntity>): Promise<MenuEntity> {
    const createdItem = await this.prisma.menuItem.create({
      data: {
        name: data.name!,
        description: data.description ?? null,
        price: data.price!,
        imageUrl: data.imageUrl ?? null,
        active: data.active ?? true,
        categoryId: data.categoryId ?? null,
      },
      include: {
        category: true,
      },
    });

    return Builder<MenuEntity>()
      .id(createdItem.id)
      .name(createdItem.name)
      .description(createdItem.description)
      .price(createdItem.price)
      .imageUrl(createdItem.imageUrl)
      .active(createdItem.active)
      .categoryId(createdItem.categoryId)
      .category(createdItem.category)
      .createdAt(createdItem.createdAt)
      .updatedAt(createdItem.updatedAt)
      .build();
  }

  async update(id: string, data: Partial<MenuEntity>): Promise<MenuEntity> {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.active !== undefined) updateData.active = data.active;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;

    const updatedItem = await this.prisma.menuItem.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    return Builder<MenuEntity>()
      .id(updatedItem.id)
      .name(updatedItem.name)
      .description(updatedItem.description)
      .price(updatedItem.price)
      .imageUrl(updatedItem.imageUrl)
      .active(updatedItem.active)
      .categoryId(updatedItem.categoryId)
      .category(updatedItem.category)
      .createdAt(updatedItem.createdAt)
      .updatedAt(updatedItem.updatedAt)
      .build();
  }

  async delete(id: string): Promise<void> {
    // Soft delete by setting active to false
    await this.prisma.menuItem.update({
      where: { id },
      data: { active: false },
    });
  }
}
