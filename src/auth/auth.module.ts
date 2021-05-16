import { Module } from '@nestjs/common';
import { JwtAuthService } from './infrastructure/service/jwt-auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/strategy/jwt.strategy';
import { AuthController } from './infrastructure/controller/auth.controller';
import { ConfigService } from '@nestjs/config';
import { LoginUserHandler } from './application/handler/login-user.handler';
import { AuthService } from './application/service/auth.service';
import { AuthResolvers } from './infrastructure/graphql/auth.resolvers';

const AuthServiceProvider = {
  provide: AuthService,
  useClass: JwtAuthService,
};
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthServiceProvider,
    JwtStrategy,
    LoginUserHandler,
    AuthResolvers,
  ],
  exports: [AuthServiceProvider],
  controllers: [AuthController],
})
export class AuthModule {}
