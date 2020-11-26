import {HttpException, HttpStatus} from "@nestjs/common";

export class HomeAlreadyExists extends HttpException {
    constructor() {
        super('Home already exists', HttpStatus.CONFLICT);
    }
}