import {MealIngredient} from "./meal-ingredient.entity";
import {CreateMeal} from "../commands/create-meal.command";
import {AggregateRoot} from "@nestjs/cqrs";
import {MealCreated} from "../events/meal-created.event";
import {MealStatus} from "./meal-status";
import {AddMealIngredient} from "../commands/add-meal-ingredient.command";
import {MealIngredientAlreadyExists} from "../exceptions/meal-ingredient-already-exists.exception";
import {MealIngredientAdded} from "../events/meal-ingredient-added.event";

export class Meal extends AggregateRoot {
    public readonly id: string;
    private _homeId: string;
    private _creatorId: string;
    private _title: string;
    private _description: string;
    private _createdAt: Date;
    private _status: MealStatus;
    private _ingredients: MealIngredient[];

    constructor(id: string,
                homeId: string,
                creatorId: string,
                title: string,
                description: string,
                createdAt: Date,
                status: MealStatus,
                ingredients: MealIngredient[]) {
        super();
        this.id = id;
        this._homeId = homeId;
        this._creatorId = creatorId;
        this._title = title;
        this._description = description;
        this._createdAt = createdAt;
        this._status = status;
        this._ingredients = ingredients;
    }

// constructor(command: CreateMeal) {
    //     super();
    //     this.id = command.id;
    //     this._homeId = command.homeId;
    //     this._creatorId = command.creatorId;
    //     this._title = command.title;
    //     this._description = command.description;
    //     this._createdAt = new Date();
    //     this._status = MealStatus.enabled();
    //     this._ingredients = command.ingredients;
    //
    //     this.apply(new MealCreated(this.id));
    // }

    get creatorId(): string {
        return this._creatorId;
    }

    set creatorId(value: string) {
        this._creatorId = value;
    }

    get status(): MealStatus {
        return this._status;
    }

    get homeId(): string {
        return this._homeId;
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

    get ingredients(): MealIngredient[] {
        return this._ingredients;
    }

    ingredientById(id: string): MealIngredient | null {
        const mealIngredient = this._ingredients.find(mealIngredient => mealIngredient.id === id);
        if (!mealIngredient)
            return null;

        return mealIngredient;
    }

     addMealIngredient(command: AddMealIngredient) {
        const mealIngredient = this.ingredientById(command.ingredientId);
        if (mealIngredient)
            throw new MealIngredientAlreadyExists();

        this._ingredients.push(new MealIngredient(
            command.mealIngredientId,
            command.ingredientId,
            command.amount,
            command.ingredientUnit
        ));
        this.apply(new MealIngredientAdded(command));
    }
}