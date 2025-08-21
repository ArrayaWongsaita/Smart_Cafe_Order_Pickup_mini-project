import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CreateUserDto extends PickType(UserEntity, ['email']) {
  @ApiProperty({
    description: 'User password',
    example: 'securePassword123',
    minLength: 6,
    writeOnly: true,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
export class CreateUserRepositoryDto extends PickType(UserEntity, ['email']) {
  @ApiProperty({
    description: 'User password',
    example: 'securePassword123',
    minLength: 6,
    writeOnly: true,
  })
  @IsString()
  @MinLength(6)
  passwordHash: string;
}
