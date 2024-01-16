import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Optional,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Optional() private readonly jwtservice: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    try {
      const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const token = req.headers.authorization;
    const { id } = this.jwtservice.verify(token);
    

    if (id) {
      req['id'] = id;
      return true;
    }
    else
    {
      return false
    }
    } catch (error) {
      throw new HttpException("Unauthorized",HttpStatus.UNAUTHORIZED)
    }
  }
}
