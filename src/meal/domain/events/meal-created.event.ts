import { CreateMealOrUpdateMeal } from '../commands/create-meal.command';

export class MealCreated {
  public readonly _occurredOn: Date;

  constructor(public readonly command: CreateMealOrUpdateMeal) {
    this._occurredOn = new Date();
  }
}
