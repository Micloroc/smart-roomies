
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CurrencyInput {
    currency?: string;
}

export interface UnitInput {
    value: string;
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

export interface CreateMealIngredientInput {
    id: string;
    mealId: string;
    ingredientId: string;
    title: string;
    amount: number;
    unit: UnitInput;
}

export interface CreateMealInput {
    id: string;
    creatorId: string;
    title: string;
    description?: string;
    createMealIngredients?: CreateMealIngredientInput[];
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
    order: number;
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
    value: string;
}

export interface IQuery {
    availableUnits(): Unit[] | Promise<Unit[]>;
    home(id: string): Home | Promise<Home>;
    ingredient(id: string): Ingredient | Promise<Ingredient>;
    ingredientsByCreatorId(id: string): Ingredient[] | Promise<Ingredient[]>;
    meal(id: string): Meal | Promise<Meal>;
    mealsByCreatorId(creatorId: string): Meal[] | Promise<Meal[]>;
    mealsByHomeId(homeId: string): Meal[] | Promise<Meal[]>;
    shoppingList(id: string): ShoppingList | Promise<ShoppingList>;
    user(id: string): User | Promise<User>;
}

export interface Home {
    id: string;
    title?: string;
    description?: string;
    adminIds?: string[];
    userIds?: string[];
    currency?: Currency;
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
    title: string;
    creatorId: string;
}

export interface Meal {
    id: string;
    creatorId: string;
    title: string;
    description?: string;
    ingredients?: MealIngredient[];
}

export interface MealIngredient {
    id: string;
    ingredientId: string;
    amount: number;
    unit?: Unit;
}

export interface ShoppingListItem {
    id: string;
    name: string;
    amount: number;
    unit: Unit;
    order: number;
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
