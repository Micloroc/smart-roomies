import {ShoppingList} from '../model/shopping-list.entity';

export abstract class ShoppingListRepository {
    abstract findById(id: string): Promise<ShoppingList>;

    abstract findAll(): Promise<ShoppingList[]>;

    abstract save(ingredient: ShoppingList): Promise<ShoppingList>;
}
