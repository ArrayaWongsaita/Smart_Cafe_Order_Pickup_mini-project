import { Module, Provider } from '@nestjs/common';
import { MenusController } from 'src/modules/menus/controllers/menus.controller';
import { IMenuItemRepositoryToken } from 'src/modules/menus/interfaces/menu-item.repository.interface';
import { MenuItemRepository } from 'src/modules/menus/repositories/menu-item.repository';
import {
  GetAllMenuItemsUseCase,
  GetAllMenuItemsUseCaseToken,
} from 'src/modules/menus/usecases/get-all-menu-items.usecase';

const providers: Provider[] = [
  {
    provide: IMenuItemRepositoryToken,
    useClass: MenuItemRepository,
  },
  {
    provide: GetAllMenuItemsUseCaseToken,
    useClass: GetAllMenuItemsUseCase,
  },
];

@Module({
  controllers: [MenusController],
  providers: [...providers],
})
export class MenusModule {}
