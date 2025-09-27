import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMenuItemUseCase } from './update-menu-item.usecase';
import {
  IMenuItemRepository,
  IMenuItemRepositoryToken,
} from '../interfaces/menu-item.repository.interface';
import {
  IMenuCategoryRepository,
  IMenuCategoryRepositoryToken,
} from '../interfaces/menu-category.repository.interface';
import { UpdateMenuItemDto } from '../dto/request/update-menu-item.dto';
import { AlreadyExistException } from 'src/shared/exceptions/already-exist.exception';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';
import { MenuEntity } from '../entities/menu-item.entity';
import { MenuCategory } from '@prisma/client';

describe('UpdateMenuItemUseCase', () => {
  let useCase: UpdateMenuItemUseCase;
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
        UpdateMenuItemUseCase,
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

    useCase = module.get<UpdateMenuItemUseCase>(UpdateMenuItemUseCase);
    mockMenuItemRepository = module.get(IMenuItemRepositoryToken);
    mockMenuCategoryRepository = module.get(IMenuCategoryRepositoryToken);
  });

  describe('execute', () => {
    it('should update a menu item successfully', async () => {
      const itemId = mockMenuItem.id;
      const updateDto: UpdateMenuItemDto = {
        name: 'Updated Latte',
        price: 7000,
      };

      const updatedItem = { ...mockMenuItem, ...updateDto };

      mockMenuItemRepository.findById.mockResolvedValue(mockMenuItem);
      mockMenuItemRepository.findByName.mockResolvedValue(null);
      mockMenuItemRepository.update.mockResolvedValue(updatedItem);

      const result = await useCase.execute(itemId, updateDto);

      expect(mockMenuItemRepository.findById).toHaveBeenCalledWith(itemId);
      expect(mockMenuItemRepository.findByName).toHaveBeenCalledWith(
        updateDto.name,
      );
      expect(mockMenuItemRepository.update).toHaveBeenCalledWith(itemId, {
        name: updateDto.name,
        price: updateDto.price,
      });
      expect(result).toEqual(updatedItem);
    });

    it('should throw NotFoundException when item does not exist', async () => {
      const itemId = 'non-existent-id';
      const updateDto: UpdateMenuItemDto = {
        name: 'Updated Item',
      };

      mockMenuItemRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute(itemId, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockMenuItemRepository.findById).toHaveBeenCalledWith(itemId);
      expect(mockMenuItemRepository.update).not.toHaveBeenCalled();
    });

    it('should throw AlreadyExistException when updating name to existing name', async () => {
      const itemId = mockMenuItem.id;
      const updateDto: UpdateMenuItemDto = {
        name: 'Existing Item',
      };

      const existingItemWithSameName: MenuEntity = {
        ...mockMenuItem,
        id: 'different-id',
        name: updateDto.name!,
      };

      mockMenuItemRepository.findById.mockResolvedValue(mockMenuItem);
      mockMenuItemRepository.findByName.mockResolvedValue(
        existingItemWithSameName,
      );

      await expect(useCase.execute(itemId, updateDto)).rejects.toThrow(
        AlreadyExistException,
      );
      expect(mockMenuItemRepository.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when categoryId does not exist', async () => {
      const itemId = mockMenuItem.id;
      const updateDto: UpdateMenuItemDto = {
        categoryId: 'non-existent-category',
      };

      mockMenuItemRepository.findById.mockResolvedValue(mockMenuItem);
      mockMenuCategoryRepository.findAll.mockResolvedValue([mockMenuCategory]);

      await expect(useCase.execute(itemId, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockMenuItemRepository.update).not.toHaveBeenCalled();
    });

    it('should update item with valid categoryId', async () => {
      const itemId = mockMenuItem.id;
      const updateDto: UpdateMenuItemDto = {
        categoryId: mockMenuCategory.id,
      };

      const updatedItem: MenuEntity = {
        ...mockMenuItem,
        categoryId: updateDto.categoryId ?? null,
      };

      mockMenuItemRepository.findById.mockResolvedValue(mockMenuItem);
      mockMenuCategoryRepository.findAll.mockResolvedValue([mockMenuCategory]);
      mockMenuItemRepository.update.mockResolvedValue(updatedItem);

      const result = await useCase.execute(itemId, updateDto);

      expect(mockMenuCategoryRepository.findAll).toHaveBeenCalledTimes(1);
      expect(mockMenuItemRepository.update).toHaveBeenCalledWith(itemId, {
        categoryId: updateDto.categoryId,
      });
      expect(result).toEqual(updatedItem);
    });
  });
});
