import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { CreateOrUpdateShoppingListItem } from './create-or-update-shopping-list-item.command';

export class UpdateShoppingList {
  @IsUUID(4)
  @IsNotEmpty()
  public readonly shoppingListId: string;
  @IsUUID(4)
  @IsNotEmpty()
  public readonly userId: string;
  @IsArray()
  public readonly items: CreateOrUpdateShoppingListItem[];
}
