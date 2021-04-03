
export class ShoppingListCreated {
    public readonly _occurredOn: Date;

    constructor(public readonly command: CreateShoppingList) {
        this._occurredOn = new Date();
    }
}