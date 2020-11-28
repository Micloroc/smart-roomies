import {Module, Provider} from '@nestjs/common';
import {IngredientRepository} from "./domain/repositories/ingredient.repository";
import {MongooseIngredientRepository} from "./infrastructure/persistence/ingredient/mongoose-ingredient-repository.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Ingredient} from "./domain/models/ingredient.entity";
import {IngredientSchema} from "./infrastructure/persistence/ingredient/ingredient.schema";
import {IngredientResolvers} from "./infrastructure/graphql/ingredient.resolvers";
import {UserModule} from "../user/user.module";
import {HomeModule} from "../home/home.module";
import {MealResolvers} from "./infrastructure/graphql/meal.resolvers";
import {MealRepository} from "./domain/repositories/meal.repository";
import {MysqlMealRepository} from "./infrastructure/persistence/meal/mongoose-meal-repository.service";
import {MealSchema} from "./infrastructure/persistence/meal/meal.schema";
import {Meal} from "./domain/models/meal.entity";
import {CreateIngredientHandler} from "./application/handlers/command/create-ingredient.handler";
import {CreateMealHandler} from "./application/handlers/command/create-meal.handler";
import {AddMealIngredientHandler} from "./application/handlers/command/add-meal-ingredient.handler";

const IngredientRepositoryProvider: Provider = {
    provide: IngredientRepository,
    useClass: MongooseIngredientRepository
}

const MealRepositoryProvider: Provider = {
    provide: MealRepository,
    useClass: MysqlMealRepository
}

@Module({
    imports: [
        UserModule,
        HomeModule
    ],
    providers: [
        IngredientRepositoryProvider,
        MealRepositoryProvider,
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
