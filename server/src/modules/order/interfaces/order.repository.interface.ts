import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';

export const IOrderRepositoryToken: unique symbol = Symbol('IOrderRepository');

export interface IOrderRepository {
  /**
   * Create a new order with order items
   * @param createOrderDto Order data with items
   * @param customerId Optional customer ID
   * @returns Created order entity
   */
  createOrder(
    createOrderDto: CreateOrderDto,
    customerId?: string,
  ): Promise<OrderEntity>;

  /**
   * Find order by ID
   * @param id Order ID
   * @returns Order entity or null
   */
  findById(id: string): Promise<OrderEntity | null>;

  /**
   * Find order by order code
   * @param orderCode Order code
   * @returns Order entity or null
   */
  findByOrderCode(orderCode: string): Promise<OrderEntity | null>;

  /**
   * Update order status
   * @param id Order ID
   * @param status New status
   * @returns Updated order entity
   */
  updateStatus(id: string, status: string): Promise<OrderEntity>;

  /**
   * Get all orders with pagination
   * @param skip Number of records to skip
   * @param take Number of records to take
   * @returns Array of order entities
   */
  findAll(skip?: number, take?: number): Promise<OrderEntity[]>;

  /**
   * Get orders by customer ID
   * @param customerId Customer ID
   * @returns Array of order entities
   */
  findByCustomerId(customerId: string): Promise<OrderEntity[]>;

  /**
   * Get total count of orders
   * @returns Total number of orders
   */
  count(): Promise<number>;

  /**
   * Get orders with pagination and metadata
   * @param skip Number of records to skip
   * @param take Number of records to take
   * @returns Object with orders array and pagination metadata
   */
  findAllWithPagination(
    skip: number,
    take: number,
  ): Promise<{
    orders: OrderEntity[];
    total: number;
  }>;
}
