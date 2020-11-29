import {IsNotEmpty, IsUUID} from "class-validator";

export class CreateIngredient {
    @IsUUID(4)
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    title: string;

    @IsUUID(4)
    @IsNotEmpty()
    homeId: string;

    @IsUUID(4)
    @IsNotEmpty()
    creatorId: string;
}
