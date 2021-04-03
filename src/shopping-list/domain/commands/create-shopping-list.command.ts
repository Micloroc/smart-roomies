import {IsInstance, IsNotEmpty, IsUUID} from "class-validator";
import {Unit} from "../../../common/domain/model/unit";

export class  CreateShoppingList {
    @IsUUID(4)
    @IsNotEmpty()
    public readonly shoppingListId: string;
    @IsUUID(4)
    @IsNotEmpty()
    public readonly userId: string;
}