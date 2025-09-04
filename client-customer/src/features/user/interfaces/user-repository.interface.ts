import { CreateUser } from '@/shared/types/user.type';

export interface IUserRepository {
  create(userData: CreateUser): Promise<string>;
}
