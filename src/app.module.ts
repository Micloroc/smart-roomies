import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [AuthModule, UserModule, InfrastructureModule, HomeModule],
})
export class AppModule {
}
