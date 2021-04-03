import {HttpException, HttpStatus} from "@nestjs/common";

export class HomeNotFound extends HttpException {
    constructor() {
        super('Calendar not found', HttpStatus.BAD_REQUEST);
    }
}