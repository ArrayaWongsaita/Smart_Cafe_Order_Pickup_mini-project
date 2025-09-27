import { Inject, Injectable } from '@nestjs/common';
import { MenuEntity } from '../entities/menu-item.entity';
import {
  IMenuItemRepository,
  IMenuItemRepositoryToken,
} from '../interfaces/menu-item.repository.interface';
import { CreateMenuItemDto } from '../dto/request/create-menu-item.dto';
import { AlreadyExistException } from 'src/shared/exceptions/already-exist.exception';
// import { NotFoundException } from 'src/shared/exceptions/not-found.exception';
import {
  IMenuCategoryRepository,
  IMenuCategoryRepositoryToken,
} from '../interfaces/menu-category.repository.interface';

@Injectable()
export class CreateMenuItemUseCase {
  constructor(
    @Inject(IMenuItemRepositoryToken)
    private readonly menuItemRepository: IMenuItemRepository,
    @Inject(IMenuCategoryRepositoryToken)
    private readonly menuCategoryRepository: IMenuCategoryRepository,
  ) {}

  async execute(dto: CreateMenuItemDto): Promise<MenuEntity> {
    // Check if item with same name already exists
    const existingItem = await this.menuItemRepository.findByName(dto.name);
    if (existingItem) {
      throw new AlreadyExistException(
        `Menu item with name '${dto.name}' already exists`,
      );
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

    // Create the menu item
    const menuItemData: Partial<MenuEntity> = {
      name: dto.name,
      description: dto.description,
      price: dto.price,
      imageUrl: dto.imageUrl,
      // active: dto?.active ?? true,
      // categoryId: dto.categoryId,
    };

    return await this.menuItemRepository.create(menuItemData);
  }
}
