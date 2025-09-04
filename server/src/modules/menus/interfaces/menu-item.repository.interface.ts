import { MenuEntity } from '../entities/menu-item.entity';
import { GetAllMenuDto } from 'src/modules/menus/dto/request/get-all-menu.dto';
import { GetAllMenuItemsResponse } from 'src/modules/menus/dto/response/get-all-menu-item.response';

export const IMenuItemRepositoryToken: unique symbol = Symbol(
  'IMenuItemRepository',
);

export interface IMenuItemRepository {
  /**
   * Find a menu item by its id.
   */
  findById(id: string): Promise<MenuEntity | null>;

  /**
   * Find a menu item by its unique name.
   */
  findByName(name: string): Promise<MenuEntity | null>;

  /**
   * Return a list of menu items that match the filter.
   */
  findAll(filter?: GetAllMenuDto): Promise<GetAllMenuItemsResponse>;

  /**
   * Create a new menu item. Accepts a partial entity (id/timestamps may be generated).
   */
  create(data: Partial<MenuEntity>): Promise<MenuEntity>;

  /**
   * Update an existing menu item by id.
   */
  update(id: string, data: Partial<MenuEntity>): Promise<MenuEntity>;

  /**
   * Delete a menu item by id.
   */
  delete(id: string): Promise<void>;
}
