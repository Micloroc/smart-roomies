import {HttpException, HttpStatus} from "@nestjs/common";

export class IngredientAlreadyExists extends HttpException {
    constructor() {
        super('Ingredient already exists', HttpStatus.CONFLICT);
    }
}