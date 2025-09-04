import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.repository';

export const FindUserByEmailUseCaseToken: unique symbol = Symbol(
  'FindUserByEmailUseCaseToken',
);

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findByEmail(email);
  }
}
