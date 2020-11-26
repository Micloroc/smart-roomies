export class MealCreated {
    private readonly _occurredOn: Date;
    private readonly _mealId: string;

    constructor(mealId: string) {
        this._mealId = mealId;
        this._occurredOn = new Date();
    }

    get occurredOn(): Date {
        return this._occurredOn;
    }

    get mealId(): string {
        return this._mealId;
    }
}