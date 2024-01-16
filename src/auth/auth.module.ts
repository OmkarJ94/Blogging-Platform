import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './jwt.gaurd';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRE'),
          },
        };
      },
    }),
    // MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
