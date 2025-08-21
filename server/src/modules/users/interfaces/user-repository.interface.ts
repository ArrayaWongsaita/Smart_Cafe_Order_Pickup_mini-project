import { UserEntity } from '../entities/user.entity';
import { CreateUserRepositoryDto } from '../dto/create-user.dto';

export interface IUserRepository {
  create(data: CreateUserRepositoryDto): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;

  delete(id: string): Promise<UserEntity>;
}
