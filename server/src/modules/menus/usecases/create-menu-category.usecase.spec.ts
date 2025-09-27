import { Test, TestingModule } from '@nestjs/testing';
import { CreateMenuCategoryUseCase } from './create-menu-category.usecase';
import {
  IMenuCategoryRepository,
  IMenuCategoryRepositoryToken,
} from '../interfaces/menu-category.repository.interface';
import { CreateMenuCategoryDto } from '../dto/request/create-menu-category.dto';
import { AlreadyExistException } from 'src/shared/exceptions/already-exist.exception';
import { MenuCategory } from '@prisma/client';

describe('CreateMenuCategoryUseCase', () => {
  let useCase: CreateMenuCategoryUseCase;
  let mockRepository: jest.Mocked<IMenuCategoryRepository>;

  const mockMenuCategory: MenuCategory = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Coffee',
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockMenuCategoryRepository = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMenuCategoryUseCase,
        {
          provide: IMenuCategoryRepositoryToken,
          useValue: mockMenuCategoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateMenuCategoryUseCase>(CreateMenuCategoryUseCase);
    mockRepository = module.get(IMenuCategoryRepositoryToken);
  });

  describe('execute', () => {
    it('should create a new menu category successfully', async () => {
      const createDto: CreateMenuCategoryDto = {
        name: 'New Category',
        sortOrder: 2,
      };

      mockRepository.findAll.mockResolvedValue([mockMenuCategory]);
      mockRepository.create.mockResolvedValue({
        ...mockMenuCategory,
        name: createDto.name,
        sortOrder: createDto.sortOrder!,
      });

      const result = await useCase.execute(createDto);

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(result.name).toBe(createDto.name);
      expect(result.sortOrder).toBe(createDto.sortOrder);
    });

    it('should throw AlreadyExistException when category name already exists', async () => {
      const createDto: CreateMenuCategoryDto = {
        name: 'Coffee',
        sortOrder: 2,
      };

      mockRepository.findAll.mockResolvedValue([mockMenuCategory]);

      await expect(useCase.execute(createDto)).rejects.toThrow(
        AlreadyExistException,
      );
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should create category with default sortOrder when not provided', async () => {
      const createDto: CreateMenuCategoryDto = {
        name: 'New Category',
      };

      mockRepository.findAll.mockResolvedValue([]);
      mockRepository.create.mockResolvedValue({
        ...mockMenuCategory,
        name: createDto.name,
        sortOrder: 0,
      });

      const result = await useCase.execute(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(result.name).toBe(createDto.name);
    });
  });
});
