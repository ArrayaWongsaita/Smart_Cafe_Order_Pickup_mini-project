import { Test, TestingModule } from '@nestjs/testing';
import { DeleteMenuItemUseCase } from './delete-menu-item.usecase';
import {
  IMenuItemRepository,
  IMenuItemRepositoryToken,
} from '../interfaces/menu-item.repository.interface';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';
import { MenuEntity } from '../entities/menu-item.entity';
import { MenuCategory } from '@prisma/client';

describe('DeleteMenuItemUseCase', () => {
  let useCase: DeleteMenuItemUseCase;
  let mockMenuItemRepository: jest.Mocked<IMenuItemRepository>;

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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteMenuItemUseCase,
        {
          provide: IMenuItemRepositoryToken,
          useValue: mockMenuItemRepo,
        },
      ],
    }).compile();

    useCase = module.get<DeleteMenuItemUseCase>(DeleteMenuItemUseCase);
    mockMenuItemRepository = module.get(IMenuItemRepositoryToken);
  });

  describe('execute', () => {
    it('should soft delete a menu item successfully', async () => {
      const itemId = mockMenuItem.id;
      const updatedItem = { ...mockMenuItem, active: false };

      mockMenuItemRepository.findById.mockResolvedValue(mockMenuItem);
      mockMenuItemRepository.update.mockResolvedValue(updatedItem);

      await useCase.execute(itemId);

      expect(mockMenuItemRepository.findById).toHaveBeenCalledWith(itemId);
      expect(mockMenuItemRepository.update).toHaveBeenCalledWith(itemId, {
        active: false,
      });
    });

    it('should throw NotFoundException when item does not exist', async () => {
      const itemId = 'non-existent-id';

      mockMenuItemRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute(itemId)).rejects.toThrow(NotFoundException);
      expect(mockMenuItemRepository.findById).toHaveBeenCalledWith(itemId);
      expect(mockMenuItemRepository.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when item is already inactive', async () => {
      const itemId = mockMenuItem.id;
      const inactiveItem = { ...mockMenuItem, active: false };

      mockMenuItemRepository.findById.mockResolvedValue(inactiveItem);

      await expect(useCase.execute(itemId)).rejects.toThrow(NotFoundException);
      expect(mockMenuItemRepository.findById).toHaveBeenCalledWith(itemId);
      expect(mockMenuItemRepository.update).not.toHaveBeenCalled();
    });
  });
});
