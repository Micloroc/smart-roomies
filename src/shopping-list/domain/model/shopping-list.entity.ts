import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { ShoppingListCreated } from '../events/shopping-list-created.event';
import { CreateShoppingList } from '../commands/create-shopping-list.command';
import { ShoppingListItem } from './shopping-list-item.entity';
import { UpdateShoppingList } from '../commands/update-shopping-list.command';
import { ShoppingListUpdated } from '../events/shopping-list-updated.event';
import { CreateOrUpdateShoppingListItem } from '../commands/create-or-update-shopping-list-item.command';
import { Unit } from '../../../common/domain/model/unit';

@Entity()
export class ShoppingList extends AggregateRoot {
  @PrimaryColumn()
  private readonly _id: string;
  @Column({ name: 'userId' })
  private readonly _userId: string;
  @OneToMany(type => ShoppingListItem, '_list', { cascade: true, eager: true })
  private _items: ShoppingListItem[];

  constructor(id: string, userId: string, items: ShoppingListItem[]) {
    super();
    this._id = id;
    this._userId = userId;
    this._items = items;
  }

  get userId(): string {
    return this._userId;
  }

  get id(): string {
    return this._id;
  }

  get items(): ShoppingListItem[] {
    return this._items;
  }

  set items(value: ShoppingListItem[]) {
    this._items = value;
  }

  static create(command: CreateShoppingList): ShoppingList {
    const shoppingList = new this(command.shoppingListId, command.userId, []);

    shoppingList.apply(new ShoppingListCreated(command));
    return shoppingList;
  }

  update(command: UpdateShoppingList) {
    command.items.forEach(command => this.createOrUpdateItem(command));
    this.items = this.items.filter(item => {
      const itemIds = command.items.map(command => command.id);
      return itemIds.includes(item.id);
    });

    this.apply(new ShoppingListUpdated(command));
  }

  createOrUpdateItem(command: CreateOrUpdateShoppingListItem) {
    const item = this.items.find(item => item.id === command.id);
    if (!item) {
      this.createItem(command);
      return;
    }
    item.update(command);
  }

  private createItem(command: CreateOrUpdateShoppingListItem) {
    const item = ShoppingListItem.new(command);
    item.list = this;
    this.items.push(item);
  }
}
