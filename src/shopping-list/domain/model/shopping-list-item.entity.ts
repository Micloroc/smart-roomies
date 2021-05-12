import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Unit } from '../../../common/domain/model/unit';
import { ShoppingList } from './shopping-list.entity';
import { CreateOrUpdateShoppingListItem } from '../commands/create-or-update-shopping-list-item.command';

@Entity()
export class ShoppingListItem {
  set order(value: number) {
    this._order = value;
  }
  get order(): number {
    return this._order;
  }
  @PrimaryColumn()
  private readonly _id: string;
  @Column({ name: 'name' })
  private _name: string;
  @Column({ name: 'amount' })
  private _amount: number;
  @Column({ name: 'order' })
  private _order: number;
  @Column((type) => Unit)
  private _unit: Unit;
  @Column({ name: 'createdAt' })
  private readonly _createdAt: Date;
  @Column({ name: 'updatedAt' })
  private _updatedAt: Date;
  @ManyToOne((type) => ShoppingList, '_items')
  private _list: ShoppingList;

  constructor(
    id: string,
    name: string,
    amount: number,
    unit: Unit,
    createdAt: Date,
    updatedAt: Date,
    order: number,
  ) {
    this._id = id;
    this._name = name;
    this._amount = amount;
    this._order = order;
    this._unit = unit;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get list(): ShoppingList {
    return this._list;
  }

  set list(value: ShoppingList) {
    this._list = value;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get unit(): Unit {
    return this._unit;
  }

  set unit(value: Unit) {
    this._unit = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  static new(command: CreateOrUpdateShoppingListItem) {
    return new this(
      command.id,
      command.name,
      command.amount,
      Unit.unitByValue(command.unit),
      new Date(),
      new Date(),
      command.order,
    );
  }

  update(command: CreateOrUpdateShoppingListItem) {
    if (command.id !== this.id) return;

    this.name = command.name;
    this.amount = command.amount;
    this.unit = Unit.unitByValue(command.unit);
    this.updatedAt = new Date();
    this.order = command.order;
  }
}
