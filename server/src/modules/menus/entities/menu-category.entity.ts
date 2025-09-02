import { IsDate, IsInt, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MenuItem } from '@prisma/client';

export class MenuCategoryEntity {
  @ApiProperty({
    description: 'Menu category UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Name of the menu category',
    example: 'Coffee',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Sort order for display',
    example: 1,
  })
  @IsInt()
  sortOrder: number;

  @ApiPropertyOptional({
    description: 'Menu items in this category',
  })
  @IsOptional()
  items?: MenuItem[];

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T12:00:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-02T12:00:00.000Z',
  })
  @IsDate()
  updatedAt: Date;
}
