import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class LoginDto extends PickType(UserEntity, ['email']) {
  @ApiPropertyOptional({
    description: 'User password',
    example: 'securePassword123',
    minLength: 6,
    writeOnly: true,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
