
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
    title: string;
    description?: string;
    creatorId?: string;
    currency?: CurrencyInput;
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

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createHome(createHome: CreateHomeInput): boolean | Promise<boolean>;
}

export class User {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}
