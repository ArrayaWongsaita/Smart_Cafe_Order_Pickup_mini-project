import { Inject } from '@nestjs/common';
import { MenuEntity } from '../entities/menu-item.entity';
import {
  IMenuItemRepository,
  IMenuItemRepositoryToken,
} from 'src/modules/menus/interfaces/menu-item.repository.interface';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';

export const GetMenuItemsByIdUseCaseToken: unique symbol = Symbol(
  'GetMenuItemsByIdUseCase',
);

export class GetMenuItemsByIdUseCase {
  constructor(
    @Inject(IMenuItemRepositoryToken)
    private readonly menuRepository: IMenuItemRepository,
  ) {}

  async execute(id: string): Promise<MenuEntity> {
    const menuItem = await this.menuRepository.findById(id);
    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }
    return menuItem;
  }
}
