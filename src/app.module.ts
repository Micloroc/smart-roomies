import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InfrastructureModule } from './infraestructure/infrastructure.module';

@Module({
  imports: [AuthModule, UserModule, InfrastructureModule],
})
export class AppModule {
}
