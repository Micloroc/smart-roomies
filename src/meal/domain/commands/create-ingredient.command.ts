import { IsNotEmpty, IsUUID } from 'class-validator';

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

  constructor(id: string, title: string, creatorId: string) {
    this.id = id;
    this.title = title;
    this.creatorId = creatorId;
  }
}
