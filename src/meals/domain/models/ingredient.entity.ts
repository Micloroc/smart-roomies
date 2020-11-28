import {AggregateRoot} from "@nestjs/cqrs";
import {CreateIngredient} from "../commands/create-ingredient.command";
import {IngredientCreated} from "../events/ingredient-created.event";
import {Column} from 'typeorm';

export class Ingredient extends AggregateRoot {
    @Column()
    private readonly _id: string;
    @Column()
    private readonly _title: string;

    constructor(command: CreateIngredient) {
        super();
        this._id = command.id;
        this._title = command.title;
        this.apply(new IngredientCreated(this._id));
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }
}