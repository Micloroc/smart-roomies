
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CurrencyInput {
    currency?: string;
}

export interface CreateHomeInput {
    id: string;
    title: string;
    description?: string;
    adminIds?: string[];
    userIds?: string[];
    creatorId?: string;
    currency?: CurrencyInput;
}

export interface CreateIngredientInput {
    id: string;
    title: string;
    creatorId: string;
    homeId: string;
}

export interface CreateMealInput {
    id: string;
    creatorId: string;
    homeId: string;
    title: string;
    description?: string;
}

export interface AddMealIngredientInput {
    mealId: string;
    mealIngredientId: string;
    ingredientId: string;
    amount: number;
    ingredientUnit: IngredientUnitInput;
}

export interface IngredientUnitInput {
    value: string;
}

export interface CreateShoppingListInput {
    shoppingListId: string;
    userId: string;
}

export interface ShoppingListItemInput {
    id: string;
    name: string;
    amount: number;
    unit: string;
}

export interface UpdateShoppingListInput {
    shoppingListId: string;
    userId: string;
    items: ShoppingListItemInput[];
}

export interface Currency {
    currency?: string;
}

export interface Unit {
    value?: string;
}

export interface Home {
    id: string;
    title?: string;
    description?: string;
    adminIds?: string[];
    userIds?: string[];
    currency?: Currency;
}

export interface IQuery {
    home(id: string): Home | Promise<Home>;
    ingredient(id: string): Ingredient | Promise<Ingredient>;
    meal(id: string): Meal | Promise<Meal>;
    shoppingList(id: string): ShoppingList | Promise<ShoppingList>;
    user(id: string): User | Promise<User>;
}

export interface IMutation {
    createHome(createHome: CreateHomeInput): boolean | Promise<boolean>;
    createIngredient(createIngredient: CreateIngredientInput): boolean | Promise<boolean>;
    createMeal(createMeal: CreateMealInput): boolean | Promise<boolean>;
    addMealIngredient(addMealIngredient: AddMealIngredientInput): boolean | Promise<boolean>;
    createShoppingList(createShoppingList: CreateShoppingListInput): boolean | Promise<boolean>;
    updateShoppingList(updateShoppingList: UpdateShoppingListInput): boolean | Promise<boolean>;
}

export interface Ingredient {
    id: string;
    title?: string;
}

export interface Meal {
    id: string;
    creatorId: string;
    homeId: string;
    title: string;
    description?: string;
}

export interface ShoppingListItem {
    id: string;
    name: string;
    amount: number;
    unit: Unit;
}

export interface ShoppingList {
    id: string;
    userId: string;
    items: ShoppingListItem[];
}

export interface User {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}
