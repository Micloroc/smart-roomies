import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { MealRepository } from '../../domain/repositories/meal.repository';
import { CreateMealOrUpdateMeal } from '../../domain/commands/create-meal.command';
import { AddMealIngredient } from '../../domain/commands/add-meal-ingredient.command';
import { Meal } from '../../domain/models/meal.entity';

@Resolver('Meal')
export class MealResolvers {
  constructor(
    private mealRepository: MealRepository,
    private commandBus: CommandBus,
  ) {}

  @Query('mealById')
  async mealById(@Args('id') id: string) {
    return this.mealRepository.findById(id);
  }

  @Query('mealsByHomeId')
  async mealsByHomeId(@Args('homeId') homeId: string): Promise<Meal[]> {
    return this.mealRepository.findByHomeId(homeId);
  }

  @Query('mealsByCreatorId')
  async mealsByCreatorId(@Args('id') id: string): Promise<Meal[]> {
    return this.mealRepository.findByCreatorId(id);
  }

  @Mutation('createOrUpdateMeal')
  async createMeal(
    @Args('createOrUpdateMeal') createOrUpdateMeal: CreateMealOrUpdateMeal,
  ) {
    await this.commandBus.execute(createOrUpdateMeal);
  }

  @Mutation('addMealIngredient')
  async addMealIngredient(
    @Args('addMealIngredient') addMealIngredient: AddMealIngredient,
  ) {
    await this.commandBus.execute(addMealIngredient);
  }
}
