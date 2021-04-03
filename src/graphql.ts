
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CurrencyInput {
    currency?: string;
}

export class CreateHomeInput {
    id: string;
    title: string;
    description?: string;
    adminIds?: string[];
    userIds?: string[];
    creatorId?: string;
    currency?: CurrencyInput;
}

export class CreateIngredientInput {
    id: string;
    title: string;
    creatorId: string;
    homeId: string;
}

export class CreateMealInput {
    id: string;
    creatorId: string;
    homeId: string;
    title: string;
    description?: string;
}

export class AddMealIngredientInput {
    mealId: string;
    mealIngredientId: string;
    ingredientId: string;
    amount: number;
    ingredientUnit: IngredientUnitInput;
}

export class IngredientUnitInput {
    value: string;
}

export class CreateShoppingListInput {
    shoppingListId: string;
    userId: string;
}

export class Currency {
    currency?: string;
}

export class Home {
    id: string;
    title?: string;
    description?: string;
    adminIds?: string[];
    userIds?: string[];
    currency?: Currency;
}

export abstract class IQuery {
    abstract home(id: string): Home | Promise<Home>;

    abstract ingredient(id: string): Ingredient | Promise<Ingredient>;

    abstract meal(id: string): Meal | Promise<Meal>;

    abstract shoppingList(id: string): ShoppingList | Promise<ShoppingList>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createHome(createHome: CreateHomeInput): boolean | Promise<boolean>;

    abstract createIngredient(createIngredient: CreateIngredientInput): boolean | Promise<boolean>;

    abstract createMeal(createMeal: CreateMealInput): boolean | Promise<boolean>;

    abstract addMealIngredient(addMealIngredient: AddMealIngredientInput): boolean | Promise<boolean>;

    abstract createShoppingList(createShoppingList: CreateShoppingListInput): boolean | Promise<boolean>;
}

export class Ingredient {
    id: string;
    title?: string;
}

export class Meal {
    id: string;
    creatorId: string;
    homeId: string;
    title: string;
    description?: string;
}

export class ShoppingListItem {
    id: string;
    name: string;
    amount: number;
}

export class ShoppingList {
    id: string;
    userId: string;
    items: ShoppingListItem[];
}

export class User {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}
