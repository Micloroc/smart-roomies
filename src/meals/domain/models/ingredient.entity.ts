import {AggregateRoot} from "@nestjs/cqrs";
import {CreateIngredient} from "../commands/create-ingredient.command";
import {IngredientCreated} from "../events/ingredient-created.event";

export class Ingredient extends AggregateRoot {
    public readonly id: string;
    private readonly _title: string;

    constructor(command: CreateIngredient) {
        super();
        this.id = command.id;
        this._title = command.title;
        this.apply(new IngredientCreated(this.id));
    }

    get title(): string {
        return this._title;
    }
}