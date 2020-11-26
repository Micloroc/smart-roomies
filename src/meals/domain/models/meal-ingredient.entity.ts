import {IngredientUnit} from "./ingredient-unit";

export class MealIngredient {
    public readonly id: string;
    private readonly _ingredientId: string;
    private readonly _amount: number;
    private readonly _unit: IngredientUnit;

    constructor(id: string, ingredientId: string, amount: number, unit: IngredientUnit) {
        this.id = id;
        this._ingredientId = ingredientId;
        this._amount = amount;
        this._unit = unit;

    }

    get unit(): IngredientUnit {
        return this._unit;
    }

    get ingredientId(): string {
        return this._ingredientId;
    }

    get amount(): number {
        return this._amount;
    }

}