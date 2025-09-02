import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';
import { GetAllMenuItemsUseCase } from 'src/modules/menus/usecases/get-all-menu-items.usecase';
import { IMenuItemRepository } from 'src/modules/menus/interfaces/menu-item.repository.interface';
import { MenuEntity } from 'src/modules/menus/entities/menu-item.entity';
import { PaginationMetaDto } from 'src/shared/dtos/pagination.dto';
import { GetAllMenuDto } from 'src/modules/menus/dto/request/get-all-menu.dto';

describe('GetAllMenuItemsUseCase (mocked repo)', () => {
  it('should return paginated menu items when repository returns data', async () => {
    // Arrange
    const repoMock = mock<IMenuItemRepository>();
    const sampleItem: MenuEntity = {
      id: faker.string.uuid(),
      name: faker.word.words(2),
      description: faker.lorem.sentence(),
      price: faker.number.int({ min: 1000, max: 10000 }),
      imageUrl: null,
      active: true,
      categoryId: null,
      category: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const sampleMeta: PaginationMetaDto = {
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    repoMock.findAll.mockResolvedValue({
      data: [sampleItem],
      meta: sampleMeta,
    });

    const useCase = new GetAllMenuItemsUseCase(repoMock);

    const query: GetAllMenuDto = { page: 1, pageSize: 20, search: undefined };

    // Act
    const result = await useCase.execute(query);

    // Assert
    expect(repoMock.findAll).toHaveBeenCalledWith(query);
    expect(result).toEqual({ data: [sampleItem], meta: sampleMeta });
  });

  it('should forward undefined filter when no query provided', async () => {
    // Arrange
    const repoMock = mock<IMenuItemRepository>();
    const sampleMeta: PaginationMetaDto = {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    repoMock.findAll.mockResolvedValue({ data: [], meta: sampleMeta });

    const useCase = new GetAllMenuItemsUseCase(repoMock);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(repoMock.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toEqual({ data: [], meta: sampleMeta });
  });
});
