import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username of the user',
    required: true,
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'password of the user',
    required: true,
  })
  password: string;
}
