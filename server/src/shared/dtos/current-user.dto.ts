import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CurrentUserDto extends PickType(UserEntity, ['email', 'role']) {
  @ApiPropertyOptional({
    description: 'Unique identifier for the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsUUID()
  sub: string;
}
