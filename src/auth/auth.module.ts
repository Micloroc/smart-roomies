import { Module } from '@nestjs/common';
import { AuthService } from './infrastructure/service/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/strategy/jwt.strategy';
import { AuthController } from './infrastructure/controller/auth.controller';
import { ConfigService } from '@nestjs/config';
import { LoginUserHandler } from './application/handler/login-user.handler';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, LoginUserHandler],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
