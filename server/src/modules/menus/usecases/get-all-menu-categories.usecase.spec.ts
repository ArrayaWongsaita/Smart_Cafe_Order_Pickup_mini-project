import { Test, TestingModule } from '@nestjs/testing';
import { GetAllMenuCategoriesUseCase } from './get-all-menu-categories.usecase';
import {
  IMenuCategoryRepository,
  IMenuCategoryRepositoryToken,
} from '../interfaces/menu-category.repository.interface';

describe('GetAllMenuCategoriesUseCase', () => {
  let useCase: GetAllMenuCategoriesUseCase;
  let mockRepository: jest.Mocked<IMenuCategoryRepository>;

  beforeEach(async () => {
    const mockMenuCategoryRepository: jest.Mocked<IMenuCategoryRepository> = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllMenuCategoriesUseCase,
        {
          provide: IMenuCategoryRepositoryToken,
          useValue: mockMenuCategoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetAllMenuCategoriesUseCase>(
      GetAllMenuCategoriesUseCase,
    );
    mockRepository = module.get(IMenuCategoryRepositoryToken);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return all menu categories', async () => {
      // Arrange
      const mockCategories = [
        {
          id: '1',
          name: 'Coffee',
          sortOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Tea',
          sortOrder: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockRepository.findAll.mockResolvedValue(mockCategories);

      // Act
      const result = await useCase.execute();

      // Assert
      expect(result).toEqual({
        data: mockCategories,
      });
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
