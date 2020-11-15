import {AggregateRoot} from "@nestjs/cqrs";
import {CreateIngredient} from "../commands/create-ingredient.command";
import {IngredientCreated} from "../events/ingredient-created.event";

export class Ingredient
    extends AggregateRoot {
    public readonly id: string;
    private readonly _title;

    constructor(id: string, title) {
        super();
        this.id = id;
        this._title = title;
    }

    get title() {
        return this._title;
    }

    static create(command: CreateIngredient) {
        const ingredient = new Ingredient(command.id, command.title);
        this.apply(new IngredientCreated(ingredient.id));
        return ingredient;
    }
}