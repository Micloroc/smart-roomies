
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CurrencyInput {
    currency?: string;
}

export class CreateIngredientInput {
    id: string;
    creatorId: string;
    title: string;
}

export class Currency {
    currency?: string;
}

export class Ingredient {
    id: string;
    title?: string;
}

export abstract class IQuery {
    abstract ingredient(id: string): Ingredient | Promise<Ingredient>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createIngredient(createIngredient: CreateIngredientInput): boolean | Promise<boolean>;
}

export class User {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}
