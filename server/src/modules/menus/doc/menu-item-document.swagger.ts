import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { GetAllMenuItemsResponse } from 'src/modules/menus/dto/response/get-all-menu-item.response';
import { CreateMenuItemResponse } from '../dto/response/create-menu-item.response';
import { CreateMenuItemDto } from '../dto/request/create-menu-item.dto';
import { UpdateMenuItemResponse } from '../dto/response/update-menu-item.response';
import { UpdateMenuItemDto } from '../dto/request/update-menu-item.dto';
import { GetMenuItemsByIdResponse } from '../dto/response/get-menu-item-by-id.response';

export function GetAllMenuItemsDocument() {
  return applyDecorators(
    ApiTags('menus'),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get menu items with pagination',
      description:
        'Retrieve a paginated list of menu items with optional filtering (active, category) and search. Authentication required.',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number (default: 1)',
      example: 1,
    }),
    ApiQuery({
      name: 'search',
      required: false,
      type: String,
      description: 'Search term for name or description',
      example: 'latte',
    }),
    ApiQuery({
      name: 'active',
      required: false,
      type: Boolean,
      description: 'Filter by availability',
      example: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved menu items',
      type: GetAllMenuItemsResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing token',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
  );
}

export function CreateMenuItemDocument() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new menu item',
      description:
        'Create a new menu item with name, price, and optional details',
    }),
    ApiBody({
      type: CreateMenuItemDto,
      description: 'Menu item creation data',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Menu item created successfully',
      type: CreateMenuItemResponse,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation error or item name already exists',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Category not found (if categoryId provided)',
    }),
  );
}

export function UpdateMenuItemDocument() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a menu item',
      description: 'Update an existing menu item by ID',
    }),
    ApiBody({
      type: UpdateMenuItemDto,
      description: 'Menu item update data',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Menu item updated successfully',
      type: UpdateMenuItemResponse,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation error or item name already exists',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Menu item or category not found',
    }),
  );
}

export function DeleteMenuItemDocument() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a menu item (soft delete)',
      description:
        'Soft delete an existing menu item by ID. This sets the active field to false instead of permanently deleting the record.',
    }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Menu item deleted successfully (set to inactive)',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Menu item not found or already inactive',
    }),
  );
}

export function GetMenuItemsByIdDocument() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get menu item by ID',
      description:
        'Retrieve a specific menu item by its ID with category information',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Menu item retrieved successfully',
      type: GetMenuItemsByIdResponse,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Menu item not found',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid ID format',
    }),
  );
}
