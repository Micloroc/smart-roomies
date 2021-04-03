import {HttpException, HttpStatus} from "@nestjs/common";

export class HomeAlreadyExists extends HttpException {
    constructor() {
        super('Calendar already exists', HttpStatus.CONFLICT);
    }
}