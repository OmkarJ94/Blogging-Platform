import {
  Injectable,
  Dependencies,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    
   try {
    const user = await this.usersService.findOne(username);
    if (user.password !== pass || !user) {
      throw new UnauthorizedException();
    }
    const token = this.jwtservice.sign({ id: user.userId });
 
    return {
      message:"Login Successfully",
      token 
    };
   } catch (error) {
    throw new UnauthorizedException("Something went wrong")
   }
  }
}
