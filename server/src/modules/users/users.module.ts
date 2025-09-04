import { Module, Provider } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import {
  CreateUserUseCase,
  CreateUserUseCaseToken,
} from 'src/modules/users/use-cases/create-user.usecase';
import {
  FindUserByEmailUseCase,
  FindUserByEmailUseCaseToken,
} from 'src/modules/users/use-cases/find-user-by-email.usecase';
import {
  FindUserByIdUseCase,
  FindUserByIdUseCaseToken,
} from 'src/modules/users/use-cases/find-user-by-id.usecase';

import { PrismaModule } from 'src/shared/prisma/prisma.module';

const providersAndExports: Provider[] = [
  { provide: FindUserByEmailUseCaseToken, useClass: FindUserByEmailUseCase },
  { provide: CreateUserUseCaseToken, useClass: CreateUserUseCase },
  { provide: FindUserByIdUseCaseToken, useClass: FindUserByIdUseCase },
];

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, ...providersAndExports],
  exports: providersAndExports,
})
export class UsersModule {}
