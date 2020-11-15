import {IsNotEmpty, IsUUID} from "class-validator";

export class CreateIngredient {
    @IsUUID(4)
    @IsNotEmpty()
    id;

    @IsNotEmpty()
    title;

    @IsUUID(4)
    @IsNotEmpty()
    creatorId;
}
