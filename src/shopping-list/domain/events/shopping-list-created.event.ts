import {CreateIngredient} from '../commands/create-ingredient.command';

export class IngredientCreated {
    public readonly _occurredOn: Date;

    constructor(public readonly command: CreateIngredient) {
        this._occurredOn = new Date();
    }
}