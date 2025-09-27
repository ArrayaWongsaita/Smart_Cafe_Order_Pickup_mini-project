import { Inject, Injectable } from '@nestjs/common';
import { MenuCategory } from '@prisma/client';
import {
  IMenuCategoryRepository,
  IMenuCategoryRepositoryToken,
} from '../interfaces/menu-category.repository.interface';
import { CreateMenuCategoryDto } from '../dto/request/create-menu-category.dto';
import { AlreadyExistException } from 'src/shared/exceptions/already-exist.exception';

@Injectable()
export class CreateMenuCategoryUseCase {
  constructor(
    @Inject(IMenuCategoryRepositoryToken)
    private readonly menuCategoryRepository: IMenuCategoryRepository,
  ) {}

  async execute(dto: CreateMenuCategoryDto): Promise<MenuCategory> {
    // Check if category with same name already exists
    const existingCategories = await this.menuCategoryRepository.findAll();
    const nameExists = existingCategories.some(
      (category) => category.name.toLowerCase() === dto.name.toLowerCase(),
    );

    if (nameExists) {
      throw new AlreadyExistException(
        `Menu category with name '${dto.name}' already exists`,
      );
    }

    return await this.menuCategoryRepository.create(dto);
  }
}
