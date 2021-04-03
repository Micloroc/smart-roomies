import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { MealRepository } from '../../domain/repositories/meal.repository';
import { CreateMeal } from '../../domain/commands/create-meal.command';
import { AddMealIngredient } from '../../domain/commands/add-meal-ingredient.command';

@Resolver('Meal')
export class MealResolvers {
  constructor(
    private mealRepository: MealRepository,
    private commandBus: CommandBus,
  ) {}

  @Query('meal')
  async getHome(@Args('id') id: string) {
    return this.mealRepository.findById(id);
  }

  @Mutation('createMeal')
  async createMeal(@Args('createMeal') createMeal: CreateMeal) {
    await this.commandBus.execute(createMeal);
  }

  @Mutation('addMealIngredient')
  async addMealIngredient(
    @Args('addMealIngredient') addMealIngredient: AddMealIngredient,
  ) {
    await this.commandBus.execute(addMealIngredient);
  }
}
