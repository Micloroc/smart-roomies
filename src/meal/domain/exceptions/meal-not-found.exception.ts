import {HttpException, HttpStatus} from "@nestjs/common";

export class MealNotFound extends HttpException {
    constructor() {
        super('Meal not found', HttpStatus.BAD_REQUEST);
    }
}