import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CheckHealthDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @Type(() => Date)
  @IsDate()
  timestamp: Date;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  version: string;
}
