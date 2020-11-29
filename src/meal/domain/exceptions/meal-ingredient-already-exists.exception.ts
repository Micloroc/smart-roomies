import {HttpException, HttpStatus} from "@nestjs/common";

export class MealIngredientAlreadyExists extends HttpException {
    constructor() {
        super('Meal ingredient already exists', HttpStatus.CONFLICT);
    }
}