import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetAllMenuItemsUseCase,
  GetAllMenuItemsUseCaseToken,
} from 'src/modules/menus/usecases/get-all-menu-items.usecase';
import {
  GetAllMenuCategoriesUseCase,
  GetAllMenuCategoriesUseCaseToken,
} from 'src/modules/menus/usecases/get-all-menu-categories.usecase';
import { GetAllMenuDto } from 'src/modules/menus/dto/request/get-all-menu.dto';
import ValidateResponse from 'src/shared/decorators/validate-response.decorator';
import { GetAllMenuItemsResponse } from 'src/modules/menus/dto/response/get-all-menu-item.response';
import { GetAllMenuCategoriesResponse } from 'src/modules/menus/dto/response/get-all-menu-categories.response';
import {
  GetAllMenuItemsDocument,
  CreateMenuItemDocument,
  UpdateMenuItemDocument,
  DeleteMenuItemDocument,
  GetMenuItemsByIdDocument,
} from 'src/modules/menus/doc/menu-item-document.swagger';
import {
  GetAllMenuCategoriesDocument,
  CreateMenuCategoryDocument,
} from 'src/modules/menus/doc/menu-category-document.swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { CreateMenuCategoryDto } from '../dto/request/create-menu-category.dto';
import { CreateMenuItemDto } from '../dto/request/create-menu-item.dto';
import { CreateMenuCategoryUseCase } from '../usecases/create-menu-category.usecase';
import { CreateMenuItemUseCase } from '../usecases/create-menu-item.usecase';
import { UpdateMenuItemUseCase } from '../usecases/update-menu-item.usecase';
import { DeleteMenuItemUseCase } from '../usecases/delete-menu-item.usecase';
import { CreateMenuCategoryResponse } from '../dto/response/create-menu-category.response';
import { CreateMenuItemResponse } from '../dto/response/create-menu-item.response';
import { UpdateMenuItemDto } from '../dto/request/update-menu-item.dto';
import { UpdateMenuItemResponse } from '../dto/response/update-menu-item.response';
import { GetMenuItemsByIdResponse } from '../dto/response/get-menu-item-by-id.response';
import {
  GetMenuItemsByIdUseCase,
  GetMenuItemsByIdUseCaseToken,
} from 'src/modules/menus/usecases/get-menu-item-by-id.usecase';

@Controller('menus')
@ApiTags('menus')
export class MenusController {
  constructor(
    @Inject(GetAllMenuItemsUseCaseToken)
    private readonly getAllUseCase: GetAllMenuItemsUseCase,
    @Inject(GetAllMenuCategoriesUseCaseToken)
    private readonly getAllCategoriesUseCase: GetAllMenuCategoriesUseCase,

    @Inject(GetMenuItemsByIdUseCaseToken)
    private readonly getMenuItemsByIdUseCase: GetMenuItemsByIdUseCase,
    private readonly createMenuCategoryUseCase: CreateMenuCategoryUseCase,
    private readonly createMenuItemUseCase: CreateMenuItemUseCase,
    private readonly updateMenuItemUseCase: UpdateMenuItemUseCase,
    private readonly deleteMenuItemUseCase: DeleteMenuItemUseCase,
  ) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @GetAllMenuItemsDocument()
  @ValidateResponse(GetAllMenuItemsResponse)
  async getAll(
    @Query() filter: GetAllMenuDto,
  ): Promise<GetAllMenuItemsResponse> {
    return this.getAllUseCase.execute(filter);
  }

  @Get('categories')
  @Public()
  @HttpCode(HttpStatus.OK)
  @GetAllMenuCategoriesDocument()
  @ValidateResponse(GetAllMenuCategoriesResponse)
  async getAllCategories(): Promise<GetAllMenuCategoriesResponse> {
    return this.getAllCategoriesUseCase.execute();
  }

  @Post('categories')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @CreateMenuCategoryDocument()
  @ValidateResponse(CreateMenuCategoryResponse)
  async createCategory(
    @Body() createCategoryDto: CreateMenuCategoryDto,
  ): Promise<CreateMenuCategoryResponse> {
    const category =
      await this.createMenuCategoryUseCase.execute(createCategoryDto);
    return {
      ...category,
      message: 'Menu category created successfully',
    };
  }

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @CreateMenuItemDocument()
  @ValidateResponse(CreateMenuItemResponse)
  async createMenuItem(
    @Body() createItemDto: CreateMenuItemDto,
  ): Promise<CreateMenuItemResponse> {
    const item = await this.createMenuItemUseCase.execute(createItemDto);
    return {
      ...item,
      message: 'Menu item created successfully',
    };
  }

  @Put(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UpdateMenuItemDocument()
  @ValidateResponse(UpdateMenuItemResponse)
  async updateMenuItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateMenuItemDto,
  ): Promise<UpdateMenuItemResponse> {
    const item = await this.updateMenuItemUseCase.execute(id, updateItemDto);
    return {
      ...item,
      message: 'Menu item updated successfully',
    };
  }

  @Delete(':id')
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteMenuItemDocument()
  async deleteMenuItem(@Param('id') id: string): Promise<void> {
    await this.deleteMenuItemUseCase.execute(id);
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @GetMenuItemsByIdDocument()
  @ValidateResponse(GetMenuItemsByIdResponse)
  async getMenuItemsById(
    @Param('id') id: string,
  ): Promise<GetMenuItemsByIdResponse> {
    return await this.getMenuItemsByIdUseCase.execute(id);
  }
}
