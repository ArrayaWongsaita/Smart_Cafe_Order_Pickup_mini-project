import { Test, TestingModule } from '@nestjs/testing';
import { CreateMenuItemUseCase } from './create-menu-item.usecase';
import {
  IMenuItemRepository,
  IMenuItemRepositoryToken,
} from '../interfaces/menu-item.repository.interface';
import {
  IMenuCategoryRepository,
  IMenuCategoryRepositoryToken,
} from '../interfaces/menu-category.repository.interface';
import { CreateMenuItemDto } from '../dto/request/create-menu-item.dto';
import { AlreadyExistException } from 'src/shared/exceptions/already-exist.exception';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';
import { MenuEntity } from '../entities/menu-item.entity';
import { MenuCategory } from '@prisma/client';

describe('CreateMenuItemUseCase', () => {
  let useCase: CreateMenuItemUseCase;
  let mockMenuItemRepository: jest.Mocked<IMenuItemRepository>;
  let mockMenuCategoryRepository: jest.Mocked<IMenuCategoryRepository>;

  const mockMenuCategory: MenuCategory = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Coffee',
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockMenuItem: MenuEntity = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Latte',
    description: 'Smooth coffee with steamed milk',
    price: 6000,
    imageUrl: null,
    active: true,
    categoryId: mockMenuCategory.id,
    category: mockMenuCategory,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockMenuItemRepo = {
      findById: jest.fn(),
      findByName: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const mockMenuCategoryRepo = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMenuItemUseCase,
        {
          provide: IMenuItemRepositoryToken,
          useValue: mockMenuItemRepo,
        },
        {
          provide: IMenuCategoryRepositoryToken,
          useValue: mockMenuCategoryRepo,
        },
      ],
    }).compile();

    useCase = module.get<CreateMenuItemUseCase>(CreateMenuItemUseCase);
    mockMenuItemRepository = module.get(IMenuItemRepositoryToken);
    mockMenuCategoryRepository = module.get(IMenuCategoryRepositoryToken);
  });

  describe('execute', () => {
    it('should create a new menu item successfully', async () => {
      const createDto: CreateMenuItemDto = {
        name: 'New Item',
        description: 'A delicious new item',
        price: 5000,
        imageUrl: null,
        categoryId: mockMenuCategory.id,
      };

      mockMenuItemRepository.findByName.mockResolvedValue(null);
      mockMenuCategoryRepository.findAll.mockResolvedValue([mockMenuCategory]);
      mockMenuItemRepository.create.mockResolvedValue({
        ...mockMenuItem,
        name: createDto.name,
        description: createDto.description,
        price: createDto.price,
      });

      const result = await useCase.execute(createDto);

      expect(mockMenuItemRepository.findByName).toHaveBeenCalledWith(
        createDto.name,
      );
      expect(mockMenuCategoryRepository.findAll).toHaveBeenCalledTimes(1);
      expect(mockMenuItemRepository.create).toHaveBeenCalledWith({
        name: createDto.name,
        description: createDto.description,
        price: createDto.price,
        imageUrl: createDto.imageUrl,
        active: createDto.active ?? true,
        categoryId: createDto.categoryId,
      });
      expect(result.name).toBe(createDto.name);
    });

    it('should throw AlreadyExistException when item name already exists', async () => {
      const createDto: CreateMenuItemDto = {
        name: 'Latte',
        price: 5000,
      };

      mockMenuItemRepository.findByName.mockResolvedValue(mockMenuItem);

      await expect(useCase.execute(createDto)).rejects.toThrow(
        AlreadyExistException,
      );
      expect(mockMenuItemRepository.findByName).toHaveBeenCalledWith(
        createDto.name,
      );
      expect(mockMenuItemRepository.create).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when categoryId does not exist', async () => {
      const createDto: CreateMenuItemDto = {
        name: 'New Item',
        price: 5000,
        categoryId: 'non-existent-id',
      };

      mockMenuItemRepository.findByName.mockResolvedValue(null);
      mockMenuCategoryRepository.findAll.mockResolvedValue([mockMenuCategory]);

      await expect(useCase.execute(createDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockMenuItemRepository.create).not.toHaveBeenCalled();
    });

    it('should create item without category when categoryId is not provided', async () => {
      const createDto: CreateMenuItemDto = {
        name: 'New Item',
        price: 5000,
      };

      mockMenuItemRepository.findByName.mockResolvedValue(null);
      mockMenuItemRepository.create.mockResolvedValue({
        ...mockMenuItem,
        name: createDto.name,
        categoryId: null,
        category: null,
      });

      const result = await useCase.execute(createDto);

      expect(mockMenuCategoryRepository.findAll).not.toHaveBeenCalled();
      expect(mockMenuItemRepository.create).toHaveBeenCalledWith({
        name: createDto.name,
        description: createDto.description,
        price: createDto.price,
        imageUrl: createDto.imageUrl,
        active: createDto.active ?? true,
        categoryId: createDto.categoryId,
      });
      expect(result.categoryId).toBeNull();
    });
  });
});
