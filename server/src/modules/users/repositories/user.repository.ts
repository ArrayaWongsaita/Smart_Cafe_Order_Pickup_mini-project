import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CreateUserRepositoryDto } from 'src/modules/users/dto/create-user.dto';
import { IUserRepository } from 'src/modules/users/interfaces/user-repository.interface';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserRepositoryDto): Promise<UserEntity> {
    return this.prisma.user.create({ data });
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async delete(id: string): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
