import { customFetch } from '@/shared/config/fetch.config';

export class MenuCategoriesServerApi {
  fetchMenuCategories = () =>
    customFetch('/v1/menus/categories', { method: 'GET' });
}

const menuCategoriesServerApi = new MenuCategoriesServerApi();

export default menuCategoriesServerApi;
