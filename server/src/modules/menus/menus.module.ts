import { Module, Provider } from '@nestjs/common';
import { MenusController } from 'src/modules/menus/controllers/menus.controller';
import { IMenuItemRepositoryToken } from 'src/modules/menus/interfaces/menu-item.repository.interface';
import { IMenuCategoryRepositoryToken } from 'src/modules/menus/interfaces/menu-category.repository.interface';
import { MenuItemRepository } from 'src/modules/menus/repositories/menu-item.repository';
import { MenuCategoryRepository } from 'src/modules/menus/repositories/menu-category.repository';
import {
  GetAllMenuItemsUseCase,
  GetAllMenuItemsUseCaseToken,
} from 'src/modules/menus/usecases/get-all-menu-items.usecase';
import {
  GetAllMenuCategoriesUseCase,
  GetAllMenuCategoriesUseCaseToken,
} from 'src/modules/menus/usecases/get-all-menu-categories.usecase';
import { CreateMenuCategoryUseCase } from './usecases/create-menu-category.usecase';
import { CreateMenuItemUseCase } from './usecases/create-menu-item.usecase';
import { UpdateMenuItemUseCase } from './usecases/update-menu-item.usecase';
import { DeleteMenuItemUseCase } from './usecases/delete-menu-item.usecase';

const providers: Provider[] = [
  {
    provide: IMenuItemRepositoryToken,
    useClass: MenuItemRepository,
  },
  {
    provide: IMenuCategoryRepositoryToken,
    useClass: MenuCategoryRepository,
  },
  {
    provide: GetAllMenuItemsUseCaseToken,
    useClass: GetAllMenuItemsUseCase,
  },
  {
    provide: GetAllMenuCategoriesUseCaseToken,
    useClass: GetAllMenuCategoriesUseCase,
  },
  CreateMenuCategoryUseCase,
  CreateMenuItemUseCase,
  UpdateMenuItemUseCase,
  DeleteMenuItemUseCase,
];

@Module({
  controllers: [MenusController],
  providers: [...providers],
})
export class MenusModule {}
