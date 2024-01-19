import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  Login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
  }
}
