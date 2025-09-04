import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { IOrderRepository } from '../interfaces/order.repository.interface';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    customerId?: string,
  ): Promise<OrderEntity> {
    const orderCode = nanoid(8); // Generate 8-character order code

    // Calculate total price from items
    let totalPrice = 0;
    for (const item of createOrderDto.data) {
      totalPrice += item.price * item.quantity;
    }

    const order = await this.prisma.order.create({
      data: {
        orderCode,
        customerId,
        status: OrderStatus.PENDING,
        totalPrice,
        items: {
          create: createOrderDto.data.map((item) => ({
            itemId: item.id,
            qty: item.quantity,
            unitPrice: item.price,
            subtotal: item.price * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });

    return new OrderEntity(order);
  }

  async findById(id: string): Promise<OrderEntity | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
            toppings: {
              include: {
                topping: true,
              },
            },
          },
        },
        customer: true,
      },
    });

    return order ? new OrderEntity(order) : null;
  }

  async findByOrderCode(orderCode: string): Promise<OrderEntity | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        orderCode: { equals: orderCode, mode: 'insensitive' },
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });

    return order ? new OrderEntity(order) : null;
  }

  async updateStatus(id: string, status: string): Promise<OrderEntity> {
    const order = await this.prisma.order.update({
      where: { id },
      data: {
        status: status as OrderStatus,
        ...(status === OrderStatus.COMPLETED && { completedAt: new Date() }),
        ...(status === OrderStatus.CANCELLED && { cancelledAt: new Date() }),
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });

    return new OrderEntity(order);
  }

  async findAll(skip = 0, take = 10): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });

    return orders.map((order) => new OrderEntity(order));
  }

  async findByCustomerId(customerId: string): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        customer: true,
      },
    });

    return orders.map((order) => new OrderEntity(order));
  }

  async count(): Promise<number> {
    return this.prisma.order.count();
  }

  async findAllWithPagination(
    skip: number,
    take: number,
  ): Promise<{
    orders: OrderEntity[];
    total: number;
  }> {
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        skip,
        take,
        orderBy: { createdAt: 'asc' },
        include: {
          items: {
            include: {
              item: true,
            },
          },
          customer: true,
        },
      }),
      this.prisma.order.count(),
    ]);

    return {
      orders: orders.map((order) => new OrderEntity(order)),
      total,
    };
  }
}
