import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAllMenuCategoriesResponse } from 'src/modules/menus/dto/response/get-all-menu-categories.response';

export function GetAllMenuCategoriesDocument() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all menu categories',
      description: 'Retrieve all menu categories ordered by sort order',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved menu categories',
      type: GetAllMenuCategoriesResponse,
    }),
  );
}
