import { Inject, Injectable } from '@nestjs/common';
// import { ResourceType } from 'src/common/types/resource.type';
// import { throwErrorAlreadyExistsException } from 'src/common/utils/create-error/create-error-already-exist.util';

import { BcryptService } from 'src/modules/auth/providers/bcrypt.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import {
  CreateUserUseCase,
  CreateUserUseCaseToken,
} from 'src/modules/users/use-cases/create-user.usecase';
import {
  FindUserByEmailUseCase,
  FindUserByEmailUseCaseToken,
} from 'src/modules/users/use-cases/find-user-by-email.usecase';
import { throwErrorEmailAlreadyExistsException } from 'src/shared/utils/create-error/create-error-already-exist.util';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export const RegisterUseCaseToken: unique symbol = Symbol('LoginUseCaseToken');

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(FindUserByEmailUseCaseToken)
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,

    @Inject(CreateUserUseCaseToken)
    private readonly createUserUseCase: CreateUserUseCase,

    private readonly Bcrypt: BcryptService,
  ) {}

  async execute(data: CreateUserDto): Promise<void> {
    const { password, ...dataWithoutPassword } = data;
    // Check if the user already exists
    const existingUser = await this.findUserByEmailUseCase.execute(data.email);
    if (existingUser) {
      throwErrorEmailAlreadyExistsException(data.email);
    }

    // Hash the password before saving
    const hashedPassword = await this.Bcrypt.hash(password);

    await this.createUserUseCase.execute({
      ...dataWithoutPassword,
      passwordHash: hashedPassword,
    });
  }
}
