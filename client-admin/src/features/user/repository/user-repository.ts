import { IUserRepository } from '@/features/user/interfaces/user-repository.interface';
import { registerUser } from '@/shared/api/server/auth.api';
import { CreateUser } from '@/shared/types/user.type';

class UserRepository implements IUserRepository {
  async create(userData: CreateUser): Promise<string> {
    return registerUser(userData);
  }
}

const userRepository = new UserRepository();

export { userRepository };
