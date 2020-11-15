import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [AuthModule, UserModule, InfrastructureModule, MealsModule],
})
export class AppModule {
}
