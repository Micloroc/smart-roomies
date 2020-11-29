import {HttpException, HttpStatus} from "@nestjs/common";

export class MealAlreadyExistsException extends HttpException {
    constructor() {
        super('Meal already exists', HttpStatus.CONFLICT);
    }
}