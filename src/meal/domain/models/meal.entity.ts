import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MealIngredient } from './meal-ingredient.entity';
import { MealCreated } from '../events/meal-created.event';
import { CreateMealOrUpdateMeal } from '../commands/create-meal.command';
import { AggregateRoot } from '@nestjs/cqrs';
import { MealIngredientAdded } from '../events/meal-ingredient-added.event';
import { MealStatus } from './meal-status';
import { MealIngredientAlreadyExists } from '../exceptions/meal-ingredient-already-exists.exception';
import { AddMealIngredient } from '../commands/add-meal-ingredient.command';
import { CreateMealIngredient } from '../commands/create-meal-ingredient.command';

@Entity()
export class Meal extends AggregateRoot {
  @PrimaryColumn({ name: 'id' })
  public readonly id: string;
  @OneToMany((type) => MealIngredient, '_meal', { cascade: true, eager: true })
  private _ingredients: MealIngredient[];
  @Column({ name: 'creatorId' })
  private _creatorId: string;
  @Column({ name: 'title' })
  private _title: string;
  @Column({ name: 'description', nullable: true })
  private _description: string;
  @Column({ name: 'createdAt' })
  private _createdAt: Date;
  @Column({ name: 'updatedAt', nullable: true })
  private _updateAt: Date | null;
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
    this._createdAt = null;
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

  set status(value: MealStatus) {
    this._status = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  private get ingredients(): MealIngredient[] {
    if (!this._ingredients) return [];
    return this._ingredients;
  }

  private set ingredients(value: MealIngredient[]) {
    this._ingredients = value;
  }

  static create(command: CreateMealOrUpdateMeal) {
    const meal = new Meal(
      command.id,
      command.creatorId,
      command.title,
      command.description,
      MealStatus.enabled(),
    );
    const mealIngredients = [];
    command.createMealIngredients.forEach(
      (createMealIngredient: CreateMealIngredient) => {
        const mealIngredient = new MealIngredient(
          createMealIngredient.id,
          createMealIngredient.ingredientId,
          createMealIngredient.amount,
          createMealIngredient.unit,
          createMealIngredient.name,
          meal,
        );
        mealIngredients.push(mealIngredient);
      },
    );

    meal.ingredients = mealIngredients;
    meal.apply(new MealCreated(command));
    return meal;
  }

  update(command: CreateMealOrUpdateMeal) {
    this.creatorId = command.creatorId;
    this.title = command.title;
    this.description = command.description;
    const mealIngredients = [];
    command.createMealIngredients.forEach(
      (createMealIngredient: CreateMealIngredient) => {
        const mealIngredient = new MealIngredient(
          createMealIngredient.id,
          createMealIngredient.ingredientId,
          createMealIngredient.amount,
          createMealIngredient.unit,
          createMealIngredient.name,
          this,
        );
        mealIngredients.push(mealIngredient);
      },
    );
    this.ingredients = mealIngredients;
    this.apply(new MealCreated(command));
    return this;
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
        command.name,
        this,
      ),
    );
    this._ingredients = ingredients;
    this.apply(new MealIngredientAdded(command));
  }
}
