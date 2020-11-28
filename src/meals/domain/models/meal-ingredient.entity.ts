import {IngredientUnit} from "./ingredient-unit";
import {Column, ManyToOne} from 'typeorm';
import {Meal} from './meal.entity';

export class MealIngredient {
    @Column()
    private readonly _id: string;
    @Column()
    private readonly _ingredientId: string;
    @Column()
    private readonly _amount: number;
    @Column()
    private readonly _unit: IngredientUnit;
    @ManyToOne(() => Meal, meal => meal.ingredients)
    private readonly _meal: Meal;

    constructor(id: string, ingredientId: string, amount: number, unit: IngredientUnit) {
        this._id = id;
        this._ingredientId = ingredientId;
        this._amount = amount;
        this._unit = unit;

    }

    get id(): string {
        return this._id;
    }

    get meal(): Meal {
        return this._meal;
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