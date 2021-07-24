
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface LoginUserInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface CurrencyInput {
    currency?: string;
}

export interface UnitInput {
    value: string;
    type: string;
    scaleMultiplier: number;
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
    amount: number;
    name: string;
    unit: UnitInput;
}

export interface CreateOrUpdateMealInput {
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
    name: string;
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

export interface IMutation {
    login(login: LoginUserInput): string | Promise<string>;
    register(register: RegisterInput): boolean | Promise<boolean>;
    createHome(createHome: CreateHomeInput): boolean | Promise<boolean>;
    createIngredient(createIngredient: CreateIngredientInput): boolean | Promise<boolean>;
    createOrUpdateMeal(createOrUpdateMeal: CreateOrUpdateMealInput): boolean | Promise<boolean>;
    addMealIngredient(addMealIngredient: AddMealIngredientInput): boolean | Promise<boolean>;
    createShoppingList(createShoppingList: CreateShoppingListInput): boolean | Promise<boolean>;
    updateShoppingList(updateShoppingList: UpdateShoppingListInput): boolean | Promise<boolean>;
}

export interface Currency {
    currency?: string;
}

export interface Unit {
    value: string;
    type: string;
    scaleMultiplier: number;
}

export interface IQuery {
    availableUnits(): Unit[] | Promise<Unit[]>;
    home(id: string): Home | Promise<Home>;
    ingredientById(id: string): Ingredient | Promise<Ingredient>;
    ingredientsByCreatorId(id: string): Ingredient[] | Promise<Ingredient[]>;
    mealById(id: string): Meal | Promise<Meal>;
    mealsByCreatorId(id: string): Meal[] | Promise<Meal[]>;
    mealsByHomeId(homeId: string): Meal[] | Promise<Meal[]>;
    shoppingList(id: string): ShoppingList | Promise<ShoppingList>;
    shoppingListByUserId(userId: string): ShoppingList | Promise<ShoppingList>;
    user(id: string): User | Promise<User>;
    userByEmail(email: string): User | Promise<User>;
}

export interface Home {
    id: string;
    title?: string;
    description?: string;
    adminIds?: string[];
    userIds?: string[];
    currency?: Currency;
}

export interface Ingredient {
    id: string;
    title: string;
    creatorId: string;
    defaultUnit: Unit;
}

export interface Meal {
    id: string;
    creatorId: string;
    title: string;
    description?: string;
    ingredients: MealIngredient[];
}

export interface MealIngredient {
    id: string;
    ingredientId: string;
    amount: number;
    name: string;
    unit: Unit;
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
