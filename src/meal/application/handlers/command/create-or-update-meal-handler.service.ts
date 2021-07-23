import {
  CommandBus,
  CommandHandler,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../user/domain/repositories/user.repository';
import { CreateMealOrUpdateMeal } from '../../../domain/commands/create-meal.command';
import { MealRepository } from '../../../domain/repositories/meal.repository';
import { MealAlreadyExistsException } from '../../../domain/exceptions/meal-already-exists.exception';
import { Meal } from '../../../domain/models/meal.entity';
import { IngredientRepository } from '../../../domain/repositories/ingredient.repository';
import { CreateIngredient } from '../../../domain/commands/create-ingredient.command';
import { IdFactory } from '../../../../common/domain/service/id.factory';
import { IngredientNotFound } from '../../../domain/exceptions/ingredient-not-found.exception';
import { CreateMealIngredient } from '../../../domain/commands/create-meal-ingredient.command';

@Injectable()
@CommandHandler(CreateMealOrUpdateMeal)
export class CreateOrUpdateMealHandler
  implements ICommandHandler<CreateMealOrUpdateMeal>
{
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
    private ingredientRepository: IngredientRepository,
    private idFactory: IdFactory,
    private publisher: EventPublisher,
    private commandBus: CommandBus,
  ) {}

  async execute(command: CreateMealOrUpdateMeal) {
    let meal = await this.mealRepository.findById(command.id);
    command.createMealIngredients = await this.populateIngredients(command);
    if (!meal) meal = Meal.create(command);
    else meal.update(command);
    await this.mealRepository.save(meal);
    meal = this.publisher.mergeObjectContext(meal);
    meal.commit();
  }

  private async populateIngredients(createMeal: CreateMealOrUpdateMeal) {
    return await Promise.all(
      createMeal.createMealIngredients.map(async (createMealIngredient) => {
        await this.createIngredientIfNeeded(createMealIngredient, createMeal);
        return createMealIngredient;
      }),
    );
  }

  private async createIngredientIfNeeded(
    createMealIngredient: CreateMealIngredient,
    createMeal: CreateMealOrUpdateMeal,
  ) {
    let ingredient = await this.ingredientRepository.findById(
      createMealIngredient.ingredientId,
    );
    if (!ingredient)
      await this.createIngredient(createMeal, createMealIngredient);
    ingredient = await this.ingredientRepository.findById(
      createMealIngredient.ingredientId,
    );
    if (!ingredient) throw new IngredientNotFound();
    createMealIngredient.ingredientId = ingredient.id;
  }

  private async createIngredient(
    createMeal: CreateMealOrUpdateMeal,
    createMealIngredient: CreateMealIngredient,
  ) {
    const createIngredient = new CreateIngredient(
      createMealIngredient.ingredientId,
      createMealIngredient.name,
      createMeal.creatorId,
      createMealIngredient.unit,
    );
    await this.commandBus.execute(createIngredient);
  }
}
