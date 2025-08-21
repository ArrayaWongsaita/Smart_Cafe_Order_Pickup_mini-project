import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.repository';

export const FindUserByIdUseCaseToken: unique symbol = Symbol(
  'FindUserByEmailUseCaseToken',
);

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findById(id);
  }
}
