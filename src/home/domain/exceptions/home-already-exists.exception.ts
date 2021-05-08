import { HttpException, HttpStatus } from '@nestjs/common';

export class HomeAlreadyExists extends HttpException {
  constructor() {
    super('Meals already exists', HttpStatus.CONFLICT);
  }
}
