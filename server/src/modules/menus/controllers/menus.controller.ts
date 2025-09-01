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
import { GetAllMenuDto } from 'src/modules/menus/dto/request/get-all-menu.dto';
import ValidateResponse from 'src/shared/decorators/validate-response.decorator';
import { GetAllMenuItemsResponse } from 'src/modules/menus/dto/response/get-all-menu-item.response';
import { GetAllMenuItemsDocument } from 'src/modules/menus/doc/menu-item-document.swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('menus')
@ApiTags('menus')
export class MenusController {
  constructor(
    @Inject(GetAllMenuItemsUseCaseToken)
    private readonly getAllUseCase: GetAllMenuItemsUseCase,
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
}
