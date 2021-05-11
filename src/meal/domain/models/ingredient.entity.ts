import { AggregateRoot } from '@nestjs/cqrs';
import { CreateIngredient } from '../commands/create-ingredient.command';
import { IngredientCreated } from '../events/ingredient-created.event';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Unit } from '../../../common/domain/model/unit';

@Entity()
export class Ingredient extends AggregateRoot {
  @PrimaryColumn({ name: 'id' })
  private readonly _id: string;
  @Column({ name: 'title' })
  private readonly _title: string;
  @Column({ name: 'creatorId' })
  private readonly _creatorId: string;
  @Column((type) => Unit)
  private _defaultUnit: Unit;

  constructor(id: string, title: string, creatorId: string, defaultUnit: Unit) {
    super();
    this._id = id;
    this._title = title;
    this._creatorId = creatorId;
    this._defaultUnit = defaultUnit;
  }

  get defaultUnit(): Unit {
    return this._defaultUnit;
  }

  get creatorId(): string {
    return this._creatorId;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  static create(command: CreateIngredient) {
    const ingredient = new Ingredient(
      command.id,
      command.title,
      command.creatorId,
      command.defaultUnit,
    );
    ingredient.apply(new IngredientCreated(command));
    return ingredient;
  }
}
