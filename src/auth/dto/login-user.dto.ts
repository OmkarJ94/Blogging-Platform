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
  @MinLength(3)
  @MaxLength(5)
  @ApiProperty({
    description: 'password of the user',
    minLength: 3,
    maxLength: 5,
    required: true,
  })
  password: string;
}
