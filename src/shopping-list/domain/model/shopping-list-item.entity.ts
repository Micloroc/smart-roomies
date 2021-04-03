import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Unit } from '../../../common/domain/model/unit';
import { ShoppingList } from './shopping-list.entity';

@Entity()
export class ShoppingListItem {
  @PrimaryColumn()
  private readonly _id: string;
  @Column({ name: 'name' })
  private readonly _name: string;
  @Column({ name: 'amount' })
  private readonly _amount: number;
  @Column(type => Unit)
  private readonly _unit: Unit;
  @Column({ name: 'createdAt' })
  private readonly _createdAt: Date;
  @Column({ name: 'updatedAt' })
  private readonly _updatedAt: Date;
  @ManyToOne(type => ShoppingList, '_items')
  private readonly _list: ShoppingList;

  constructor(
    id: string,
    name: string,
    amount: number,
    unit: Unit,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = id;
    this._name = name;
    this._amount = amount;
    this._unit = unit;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get list(): ShoppingList {
    return this._list;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get amount(): number {
    return this._amount;
  }

  get unit(): Unit {
    return this._unit;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
