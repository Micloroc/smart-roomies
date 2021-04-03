import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { ShoppingListCreated } from '../events/shopping-list-created.event';
import { CreateShoppingList } from '../commands/create-shopping-list.command';
import { ShoppingListItem } from './shopping-list-item.entity';

@Entity()
export class ShoppingList extends AggregateRoot {
  @PrimaryColumn()
  private readonly _id: string;
  @Column({ name: 'userId' })
  private readonly userId: string;
  @OneToMany(type => ShoppingListItem, '_list', { cascade: true })
  private readonly _items: ShoppingListItem[];

  constructor(id: string, userId: string, items: ShoppingListItem[]) {
    super();
    this._id = id;
    this.userId = userId;
    this._items = items;
  }

  get id(): string {
    return this._id;
  }

  get items(): ShoppingListItem[] {
    return this._items;
  }

  static create(command: CreateShoppingList): ShoppingList {
    const user = new this(command.shoppingListId, command.userId, []);
    user.apply(new ShoppingListCreated(command));
    return user;
  }
}
