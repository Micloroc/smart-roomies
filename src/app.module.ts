import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {InfrastructureModule} from './infrastructure/infrastructure.module';
import {MealModule} from './meal/meal.module';
import {HomeModule} from "./home/home.module";
import { TaskModule } from './task/task.module';

@Module({
    imports: [AuthModule, UserModule, InfrastructureModule, HomeModule, MealModule, TaskModule],
})
export class AppModule {
}
