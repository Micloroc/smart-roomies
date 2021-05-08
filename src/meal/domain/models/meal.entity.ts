import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MealIngredient } from './meal-ingredient.entity';
import { MealCreated } from '../events/meal-created.event';
import { CreateMeal } from '../commands/create-meal.command';
import { AggregateRoot } from '@nestjs/cqrs';
import { MealIngredientAdded } from '../events/meal-ingredient-added.event';
import { MealStatus } from './meal-status';
import { MealIngredientAlreadyExists } from '../exceptions/meal-ingredient-already-exists.exception';
import { AddMealIngredient } from '../commands/add-meal-ingredient.command';

@Entity()
export class Meal extends AggregateRoot {
  @PrimaryColumn({ name: 'id' })
  public readonly id: string;
  @OneToMany((type) => MealIngredient, '_meal', { cascade: true })
  private _ingredients: MealIngredient[];
  @Column({ name: 'creatorId' })
  private _creatorId: string;
  @Column({ name: 'title' })
  private _title: string;
  @Column({ name: 'description', nullable: true })
  private _description: string;
  @Column({ name: 'createdAt' })
  private _createdAt: Date;
  @Column((type) => MealStatus)
  private _status: MealStatus;

  constructor(
    id: string,
    creatorId: string,
    title: string,
    description: string,
    status: MealStatus,
  ) {
    super();
    this.id = id;
    this._creatorId = creatorId;
    this._title = title;
    this._description = description;
    if (!description) this._description = '';

    this._createdAt = new Date();
    this._status = status;
  }

  get creatorId(): string {
    return this._creatorId;
  }

  set creatorId(value: string) {
    this._creatorId = value;
  }

  get status(): MealStatus {
    return this._status;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  private get ingredients(): MealIngredient[] {
    if (!this._ingredients) return [];
    return this._ingredients;
  }

  private set ingredients(value: MealIngredient[]) {
    this._ingredients = value;
  }

  static create(command: CreateMeal) {
    const meal = new Meal(
      command.id,
      command.creatorId,
      command.title,
      command.description,
      MealStatus.enabled(),
    );
    const mealIngredients = [];
    command.createMealIngredientCommands.forEach((createMealIngredient) => {
      const mealIngredient = new MealIngredient(
        createMealIngredient.id,
        createMealIngredient.ingredientId,
        createMealIngredient.amount,
        createMealIngredient.unit,
        meal,
      );
      mealIngredients.push(mealIngredient);
    });

    meal.ingredients = mealIngredients;
    meal.apply(new MealCreated(command));
    return meal;
  }

  ingredientById(id: string): MealIngredient | null {
    const mealIngredient = this.ingredients.find(
      (mealIngredient) => mealIngredient.id === id,
    );
    if (!mealIngredient) return null;

    return mealIngredient;
  }

  addMealIngredient(command: AddMealIngredient) {
    const mealIngredient = this.ingredientById(command.ingredientId);
    if (mealIngredient) throw new MealIngredientAlreadyExists();

    const ingredients = this.ingredients;
    ingredients.push(
      new MealIngredient(
        command.mealIngredientId,
        command.ingredientId,
        command.amount,
        command.ingredientUnit,
        this,
      ),
    );
    this._ingredients = ingredients;
    this.apply(new MealIngredientAdded(command));
  }
}
