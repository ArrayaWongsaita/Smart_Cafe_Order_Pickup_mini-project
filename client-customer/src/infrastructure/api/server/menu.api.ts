import { customFetch } from '@/shared/config/fetch.config';

export class MenuServerApi {
  fetchMenu = (searchParams: string) =>
    customFetch(`/v1/menus?${searchParams}`, { method: 'GET' });
}

const menuServerApi = new MenuServerApi();

export default menuServerApi;
