import { Inject } from '@nestjs/common';
import { MenuEntity } from '../entities/menu-item.entity';

import { PaginationMetaDto } from 'src/shared/dtos/pagination.dto';
import {
  IMenuItemRepository,
  IMenuItemRepositoryToken,
} from 'src/modules/menus/interfaces/menu-item.repository.interface';
import { GetAllMenuDto } from 'src/modules/menus/dto/request/get-all-menu.dto';

export const GetAllMenuItemsUseCaseToken: unique symbol = Symbol(
  'GetAllMenuItemsUseCase',
);

export class GetAllMenuItemsUseCase {
  constructor(
    @Inject(IMenuItemRepositoryToken)
    private readonly menuRepository: IMenuItemRepository,
  ) {}

  execute(filter?: GetAllMenuDto): Promise<{
    data: MenuEntity[];
    meta: PaginationMetaDto;
  }> {
    return this.menuRepository.findAll(filter);
  }
}
