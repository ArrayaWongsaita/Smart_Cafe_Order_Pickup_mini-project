import { Inject, Injectable } from '@nestjs/common';
import { MenuEntity } from '../entities/menu-item.entity';
import {
  IMenuItemRepository,
  IMenuItemRepositoryToken,
} from '../interfaces/menu-item.repository.interface';
import { UpdateMenuItemDto } from '../dto/request/update-menu-item.dto';
import { AlreadyExistException } from 'src/shared/exceptions/already-exist.exception';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';
import {
  IMenuCategoryRepository,
  IMenuCategoryRepositoryToken,
} from '../interfaces/menu-category.repository.interface';

@Injectable()
export class UpdateMenuItemUseCase {
  constructor(
    @Inject(IMenuItemRepositoryToken)
    private readonly menuItemRepository: IMenuItemRepository,
    @Inject(IMenuCategoryRepositoryToken)
    private readonly menuCategoryRepository: IMenuCategoryRepository,
  ) {}

  async execute(id: string, dto: UpdateMenuItemDto): Promise<MenuEntity> {
    // Check if the menu item exists
    const existingItem = await this.menuItemRepository.findById(id);
    if (!existingItem) {
      throw new NotFoundException(`Menu item with id '${id}' not found`);
    }

    // If name is being updated, check if another item with same name exists
    if (dto.name && dto.name !== existingItem.name) {
      const itemWithSameName = await this.menuItemRepository.findByName(
        dto.name,
      );
      if (itemWithSameName && itemWithSameName.id !== id) {
        throw new AlreadyExistException(
          `Menu item with name '${dto.name}' already exists`,
        );
      }
    }

    // If categoryId is provided, verify the category exists
    // if (dto.categoryId) {
    //   const categories = await this.menuCategoryRepository.findAll();
    //   const categoryExists = categories.some(
    //     (category) => category.id === dto.categoryId,
    //   );

    //   if (!categoryExists) {
    //     throw new NotFoundException(
    //       `Menu category with id '${dto.categoryId}' not found`,
    //     );
    //   }
    // }

    // Update the menu item
    const updateData: Partial<MenuEntity> = {};
    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.price !== undefined) updateData.price = dto.price;
    if (dto.imageUrl !== undefined) updateData.imageUrl = dto.imageUrl;
    // if (dto.active !== undefined) updateData.active = dto.active;
    // if (dto.categoryId !== undefined) updateData.categoryId = dto.categoryId;

    return await this.menuItemRepository.update(id, updateData);
  }
}
