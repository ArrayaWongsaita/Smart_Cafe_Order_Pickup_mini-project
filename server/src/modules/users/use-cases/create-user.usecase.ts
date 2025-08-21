import { Injectable } from '@nestjs/common';
import { CreateUserRepositoryDto } from 'src/modules/users/dto/create-user.dto';

import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.repository';

export const CreateUserUseCaseToken: unique symbol = Symbol(
  'CreateUserUseCaseToken',
);

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserRepositoryDto): Promise<UserEntity> {
    return await this.userRepository.create(data);
  }
}
