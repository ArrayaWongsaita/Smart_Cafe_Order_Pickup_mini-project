import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MenuCategory, OrderItem } from '@prisma/client';

export class MenuEntity {
  @ApiProperty({
    description: 'Menu item UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Name of the menu item',
    example: 'Latte',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the menu item',
    example: 'Smooth coffee with steamed milk',
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    description: 'Price in smallest currency unit',
    example: 6000,
  })
  @IsInt()
  price: number;

  @ApiPropertyOptional({
    description: 'Image URL for the menu item',
    example:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Kawaii_paper_coffee_cup_clip_art.svg/1920px-Kawaii_paper_coffee_cup_clip_art.svg.png?20191207190614',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @ApiProperty({
    description: 'Whether the item is active/available',
    example: true,
  })
  @IsBoolean()
  active: boolean;

  @ApiPropertyOptional({
    description: 'Category UUID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string | null;

  @ApiPropertyOptional({
    description: 'Related category object',
  })
  @IsOptional()
  category?: MenuCategory | null;

  @ApiPropertyOptional({
    description: 'Related order items',
  })
  @IsOptional()
  orderItems?: OrderItem[];

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
