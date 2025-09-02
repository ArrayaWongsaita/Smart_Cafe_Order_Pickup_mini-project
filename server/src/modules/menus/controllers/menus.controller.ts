import {
  Controller,
  Get,
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
import { GetAllMenuItemsDocument } from 'src/modules/menus/doc/menu-item-document.swagger';
import { GetAllMenuCategoriesDocument } from 'src/modules/menus/doc/menu-category-document.swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('menus')
@ApiTags('menus')
export class MenusController {
  constructor(
    @Inject(GetAllMenuItemsUseCaseToken)
    private readonly getAllUseCase: GetAllMenuItemsUseCase,
    @Inject(GetAllMenuCategoriesUseCaseToken)
    private readonly getAllCategoriesUseCase: GetAllMenuCategoriesUseCase,
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
}
