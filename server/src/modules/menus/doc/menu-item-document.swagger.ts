import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllMenuItemsResponse } from 'src/modules/menus/dto/response/get-all-menu-item.response';

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
