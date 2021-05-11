import { IsNotEmpty, IsUUID } from 'class-validator';
import { Unit } from '../../../common/domain/model/unit';

export class CreateIngredient {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  title: string;
  @IsUUID(4)
  @IsUUID(4)
  @IsNotEmpty()
  creatorId: string;
  @IsNotEmpty()
  public readonly defaultUnit: Unit;

  constructor(id: string, title: string, creatorId: string, defaultUnit: Unit) {
    this.id = id;
    this.title = title;
    this.creatorId = creatorId;
    this.defaultUnit = defaultUnit;
  }
}
