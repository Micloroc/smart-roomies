import {CreateMeal} from '../commands/create-meal.command';

export class MealCreated {
    public readonly _occurredOn: Date;

    constructor(public readonly command: CreateMeal) {
        this._occurredOn = new Date();
    }
}