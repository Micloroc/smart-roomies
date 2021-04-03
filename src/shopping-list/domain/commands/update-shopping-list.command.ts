import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ShoppingListItem } from '../model/shopping-list-item.entity';

export class UpdateShoppingList {
  @IsUUID(4)
  @IsNotEmpty()
  public readonly shoppingListId: string;
  @IsUUID(4)
  @IsNotEmpty()
  public readonly userId: string;
  @IsArray()
  public readonly items: ShoppingListItem[];
}
