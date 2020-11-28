import {Module} from '@nestjs/common';
import {IngredientResolvers} from "./infrastructure/graphql/ingredient.resolvers";
import {UserModule} from "../user/user.module";
import {HomeModule} from "../home/home.module";
import {MealResolvers} from "./infrastructure/graphql/meal.resolvers";
import {CreateIngredientHandler} from "./application/handlers/command/create-ingredient.handler";
import {CreateMealHandler} from "./application/handlers/command/create-meal.handler";
import {AddMealIngredientHandler} from "./application/handlers/command/add-meal-ingredient.handler";
import {TypeOrmModule} from '@nestjs/typeorm';
import {MysqlMealRepository} from './infrastructure/persistence/meal/mysql-meal-repository.service';


@Module({
    imports: [
        UserModule,
        HomeModule,
        TypeOrmModule.forFeature([MysqlMealRepository])
    ],
    providers: [
        CreateIngredientHandler,
        IngredientResolvers,
        MealResolvers,
        CreateMealHandler,
        AddMealIngredientHandler
    ],
    exports: [],
})
export class MealsModule {
}
