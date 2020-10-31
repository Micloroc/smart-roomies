import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InfrastructureModule } from './infraestructure/infrastructure.module';

@Module({
  imports: [AuthModule, UserModule, InfrastructureModule],
  controllers: [AppController],
})
export class AppModule {
}
