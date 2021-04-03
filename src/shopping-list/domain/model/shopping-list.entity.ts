import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {AggregateRoot} from '@nestjs/cqrs';
import {ShoppingListItem} from './shopping-list-item.entity';
import {ShoppingListCreated} from '../events/shopping-list-created.event';
import {CreateShoppingList} from '../commands/create-shopping-list.command';

@Entity()
export class ShoppingList extends AggregateRoot {
    @PrimaryColumn()
    private readonly _id: string;
    @Column({name: 'userId'})
    private readonly userId: string;
    @OneToMany(() => ShoppingListItem, item => item.list)
    private readonly _items: ShoppingListItem[];


    get id(): string {
        return this._id;
    }

    get items(): ShoppingListItem[] {
        return this._items;
    }

    static create(command: CreateShoppingList): ShoppingList {
        const user = new this();
        user.apply(new ShoppingListCreated(command));
        return user;
    }
}
