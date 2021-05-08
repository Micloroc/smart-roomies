import { HttpException, HttpStatus } from '@nestjs/common';

export class HomeNotFound extends HttpException {
  constructor() {
    super('Meals not found', HttpStatus.BAD_REQUEST);
  }
}
