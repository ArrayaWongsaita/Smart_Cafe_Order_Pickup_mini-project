import { orderRepository } from '../repositories';

export class StopTrackOrderUseCase {
  execute(orderCode: string): void {
    return orderRepository.stopTrackOrder(orderCode);
  }
}

// Create a singleton instance
export const stopTrackOrderUseCase = new StopTrackOrderUseCase();
