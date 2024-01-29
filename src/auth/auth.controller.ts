import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized(check all fields and route)',
  })
  @HttpCode(HttpStatus.OK)
  Login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
  }
}
