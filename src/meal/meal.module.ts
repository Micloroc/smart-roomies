import { Module, Provider } from '@nestjs/common';
import { IngredientResolvers } from './infrastructure/graphql/ingredient.resolvers';
import { UserModule } from '../user/user.module';
import { HomeModule } from '../home/home.module';
import { MealResolvers } from './infrastructure/graphql/meal.resolvers';
import { CreateIngredientHandler } from './application/handlers/command/create-ingredient.handler';
import { CreateOrUpdateMealHandler } from './application/handlers/command/create-or-update-meal-handler.service';
import { AddMealIngredientHandler } from './application/handlers/command/add-meal-ingredient.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlMealRepository } from './infrastructure/persistence/meal/mysql-meal-repository.service';
import { MealRepository } from './domain/repositories/meal.repository';
import { IngredientRepository } from './domain/repositories/ingredient.repository';
import { MysqlIngredientRepository } from './infrastructure/persistence/ingredient/mysql-ingredient-repository.service';
import { MealIngredient } from './domain/models/meal-ingredient.entity';
import { Connection } from 'typeorm';
import { Meal } from './domain/models/meal.entity';
import { Ingredient } from './domain/models/ingredient.entity';

const MealRepositoryProvider: Provider = {
  provide: MealRepository,
  useFactory: (connection) =>
    connection.getCustomRepository(MysqlMealRepository),
  inject: [Connection],
};

const IngredientRepositoryProvider: Provider = {
  provide: IngredientRepository,
  useFactory: (connection) =>
    connection.getCustomRepository(MysqlIngredientRepository),
  inject: [Connection],
};

@Module({
  imports: [
    UserModule,
    HomeModule,
    TypeOrmModule.forFeature([MealIngredient, Meal, Ingredient]),
  ],
  providers: [
    MealRepositoryProvider,
    IngredientRepositoryProvider,
    CreateIngredientHandler,
    IngredientResolvers,
    MealResolvers,
    CreateOrUpdateMealHandler,
    AddMealIngredientHandler,
  ],
  exports: [],
})
export class MealModule {}
