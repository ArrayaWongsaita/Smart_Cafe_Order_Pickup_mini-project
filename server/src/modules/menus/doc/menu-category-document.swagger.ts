import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { GetAllMenuCategoriesResponse } from 'src/modules/menus/dto/response/get-all-menu-categories.response';
import { CreateMenuCategoryResponse } from '../dto/response/create-menu-category.response';
import { CreateMenuCategoryDto } from '../dto/request/create-menu-category.dto';

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

export function CreateMenuCategoryDocument() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new menu category',
      description:
        'Create a new menu category with name and optional sort order',
    }),
    ApiBody({
      type: CreateMenuCategoryDto,
      description: 'Menu category creation data',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Menu category created successfully',
      type: CreateMenuCategoryResponse,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation error or category name already exists',
    }),
  );
}
