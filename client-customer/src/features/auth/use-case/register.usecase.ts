import { IUserRepository } from '@/features/user/interfaces/user-repository.interface';
import { userRepository } from '@/features/user/repository/user-repository';
import { CreateUser } from '@/shared/types/user.type';

class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: CreateUser): Promise<string> {
    return this.userRepository.create(userData);
  }
}

const registerUserUseCase = new RegisterUseCase(userRepository);

export { registerUserUseCase };
