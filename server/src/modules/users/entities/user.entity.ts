import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    description: 'User UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'customer@example.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Hashed password (write only)',
    writeOnly: true,
    example: '$2b$10$hashhashhash',
  })
  @IsOptional()
  @IsString()
  passwordHash?: string;

  @ApiProperty({
    description: 'User role',
    enum: ['CUSTOMER', 'BARISTA', 'ADMIN'],
    example: 'CUSTOMER',
  })
  @IsEnum(['CUSTOMER', 'BARISTA', 'ADMIN'])
  role: 'CUSTOMER' | 'BARISTA' | 'ADMIN';

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
