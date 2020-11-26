import {HttpException, HttpStatus} from "@nestjs/common";

export class HomeNotFound extends HttpException {
    constructor() {
        super('Home not found', HttpStatus.BAD_REQUEST);
    }
}