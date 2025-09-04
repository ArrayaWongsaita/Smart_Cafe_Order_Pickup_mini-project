import { OrderItem, MenuItem } from '@prisma/client';

export interface OrderItemWithMenuItem extends OrderItem {
  item: MenuItem;
}

export class OrderItemEntity implements OrderItem {
  id: string;
  orderId: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
  itemId: string;
  createdAt: Date;
  item?: MenuItem;

  constructor(orderItem: OrderItemWithMenuItem) {
    this.id = orderItem.id;
    this.orderId = orderItem.orderId;
    this.qty = orderItem.qty;
    this.unitPrice = orderItem.unitPrice;
    this.subtotal = orderItem.subtotal;
    this.itemId = orderItem.itemId;
    this.createdAt = orderItem.createdAt;
    this.item = orderItem.item;
  }
}
