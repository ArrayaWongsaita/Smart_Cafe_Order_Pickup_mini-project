import { Inject, Injectable } from '@nestjs/common';
import {
  IMenuCategoryRepository,
  IMenuCategoryRepositoryToken,
} from 'src/modules/menus/interfaces/menu-category.repository.interface';
import { GetAllMenuCategoriesResponse } from 'src/modules/menus/dto/response/get-all-menu-categories.response';

@Injectable()
export class GetAllMenuCategoriesUseCase {
  constructor(
    @Inject(IMenuCategoryRepositoryToken)
    private readonly menuCategoryRepository: IMenuCategoryRepository,
  ) {}

  async execute(): Promise<GetAllMenuCategoriesResponse> {
    const categories = await this.menuCategoryRepository.findAll();

    return {
      data: categories,
    };
  }
}

export const GetAllMenuCategoriesUseCaseToken = Symbol(
  'GetAllMenuCategoriesUseCase',
);
