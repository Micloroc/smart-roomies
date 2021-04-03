import {HttpException, HttpStatus} from '@nestjs/common';

export class ShoppingListAlreadyExists extends HttpException {
    constructor() {
        super('ShoppingList already exists', HttpStatus.CONFLICT);
    }
}