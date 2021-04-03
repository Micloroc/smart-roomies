import { CreateShoppingList } from '../commands/create-shopping-list.command';
import { UpdateShoppingList } from '../commands/update-shopping-list.command';

export class ShoppingListUpdated {
  public readonly _occurredOn: Date;

  constructor(public readonly command: UpdateShoppingList) {
    this._occurredOn = new Date();
  }
}
