import {AggregateRoot} from "@nestjs/cqrs";
import {CreateIngredient} from "../commands/create-ingredient.command";
import {IngredientCreated} from "../events/ingredient-created.event";
import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class Ingredient extends AggregateRoot {
    @PrimaryColumn({name: 'id'})
    private readonly _id: string;
    @Column({name: 'title'})
    private readonly _title: string;

    constructor(id: string, title: string) {
        super();
        this._id = id;
        this._title = title;
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    static create(command: CreateIngredient) {
        const ingredient = new Ingredient(command.id, command.title)
        ingredient.apply(new IngredientCreated(command));
        return ingredient;
    }
}