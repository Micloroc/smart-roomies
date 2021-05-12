import { HttpException, HttpStatus } from '@nestjs/common';

export class UnitNotFound extends HttpException {
  constructor() {
    super('Unit not found', HttpStatus.CONFLICT);
  }
}
