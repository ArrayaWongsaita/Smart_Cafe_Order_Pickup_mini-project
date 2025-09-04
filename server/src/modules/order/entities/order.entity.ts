import { Order, OrderStatus, OrderItem, MenuItem } from '@prisma/client';
import {
  IsString,
  IsUUID,
  IsEnum,
  IsInt,
  IsDate,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface OrderWithItems extends Order {
  items?: (OrderItem & {
    item: MenuItem;
  })[];
}

export class OrderEntity implements Order {
  @ApiProperty({
    description: 'Order UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Order code for customer reference',
    example: 'ORD001',
  })
  @IsString()
  orderCode: string;

  @ApiPropertyOptional({
    description: 'Customer UUID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsOptional()
  @IsUUID()
  customerId: string | null;

  @ApiProperty({
    description: 'Order status',
    example: 'PREPARING',
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({
    description: 'Total price in smallest currency unit',
    example: 15000,
  })
  @IsInt()
  totalPrice: number;

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

  @ApiPropertyOptional({
    description: 'Completion timestamp',
    example: '2024-01-02T13:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  completedAt: Date | null;

  @ApiPropertyOptional({
    description: 'Cancellation timestamp',
    example: '2024-01-02T12:30:00.000Z',
  })
  @IsOptional()
  @IsDate()
  cancelledAt: Date | null;

  @ApiPropertyOptional({
    description: 'Order notes',
    example: 'Extra hot, no sugar',
  })
  @IsOptional()
  @IsString()
  notes: string | null;

  @ApiPropertyOptional({
    description: 'Order items with menu details',
    type: 'array',
  })
  @IsOptional()
  @IsArray()
  items?: (OrderItem & {
    item: MenuItem;
  })[];

  constructor(order: OrderWithItems) {
    this.id = order.id;
    this.orderCode = order.orderCode;
    this.customerId = order.customerId;
    this.status = order.status;
    this.totalPrice = order.totalPrice;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
    this.completedAt = order.completedAt;
    this.cancelledAt = order.cancelledAt;
    this.notes = order.notes;
    this.items = order.items;
  }
}
