export class IngredientCreated {
    private readonly _occurredOn: Date;
    private readonly _ingredientId: string;

    constructor(ingredientId: string) {
        this._ingredientId = ingredientId;
        this._occurredOn = new Date();
    }

    get occurredOn(): Date {
        return this._occurredOn;
    }

    get ingredientId(): string {
        return this._ingredientId;
    }
}