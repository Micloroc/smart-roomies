import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {IngredientUnit} from './ingredient-unit';
import {Meal} from './meal.entity';
import {MealStatus} from './meal-status';

@Entity()
export class MealIngredient {
    @PrimaryColumn({name: 'id'})
    private readonly _id: string;
    @Column({name: 'ingredientId'})
    private readonly _ingredientId: string;
    @Column({name: 'amount'})
    private readonly _amount: number;
    @Column(type => IngredientUnit)
    private _unit: IngredientUnit;
    @ManyToOne(type => Meal, "_ingredients")
    private readonly _meal: Meal;

    constructor(id: string, ingredientId: string, amount: number, unit: IngredientUnit, meal: Meal) {
        this._id = id;
        this._ingredientId = ingredientId;
        this._amount = amount;
        this._unit = unit;
        this._meal = meal;
        console.log(unit);
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