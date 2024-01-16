import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter the name field' })
  name: string;

  @IsEmail({}, { message: 'Please enter the valid email' })
  @IsNotEmpty({ message: 'Please enter the email field' })
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(5)
  password: string;
}
