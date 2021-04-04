import { IsInstance, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Unit } from '../../../common/domain/model/unit';
import { Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { ShoppingList } from '../model/shopping-list.entity';

export class CreateOrUpdateShoppingListItem {
  @IsUUID(4)
  @IsNotEmpty()
  public readonly id: string;
  @IsNotEmpty()
  public readonly name: string;
  @IsNotEmpty()
  @IsNumber()
  public readonly amount: number;
  @IsNotEmpty()
  public readonly unit: string;
}
