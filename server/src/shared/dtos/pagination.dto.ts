import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsBoolean } from 'class-validator';

export class PaginationMetaDto {
  @ApiPropertyOptional({ example: 0, description: 'Total number of items' })
  @IsInt()
  total: number;

  @ApiPropertyOptional({ example: 1, description: 'Current page number' })
  @IsInt()
  page: number;

  @ApiPropertyOptional({ example: 10, description: 'Items per page' })
  @IsInt()
  limit: number;

  @ApiPropertyOptional({ example: 0, description: 'Total number of pages' })
  @IsInt()
  totalPages: number;

  @ApiPropertyOptional({ example: false, description: 'Is there a next page?' })
  @IsBoolean()
  hasNextPage: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Is there a previous page?',
  })
  @IsBoolean()
  hasPreviousPage: boolean;
}
