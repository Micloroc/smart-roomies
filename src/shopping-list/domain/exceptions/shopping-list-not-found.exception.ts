import { HttpException, HttpStatus } from '@nestjs/common';

export class ShoppingListNotFound extends HttpException {
  constructor() {
    super('Shopping list not found', HttpStatus.CONFLICT);
  }
}
