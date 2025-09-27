import { Inject, Injectable } from '@nestjs/common';
import {
  IMenuItemRepository,
  IMenuItemRepositoryToken,
} from '../interfaces/menu-item.repository.interface';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';

@Injectable()
export class DeleteMenuItemUseCase {
  constructor(
    @Inject(IMenuItemRepositoryToken)
    private readonly menuItemRepository: IMenuItemRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // Check if the menu item exists and is active
    const existingItem = await this.menuItemRepository.findById(id);
    if (!existingItem || !existingItem.active) {
      throw new NotFoundException(`Menu item with id '${id}' not found`);
    }

    // Soft delete the menu item by setting active to false
    await this.menuItemRepository.update(id, { active: false });
  }
}
