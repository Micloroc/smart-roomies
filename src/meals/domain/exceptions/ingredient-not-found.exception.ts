import {HttpException, HttpStatus} from "@nestjs/common";

export class IngredientNotFound extends HttpException {
    constructor() {
        super('Ingredient not found', HttpStatus.BAD_REQUEST);
    }
}