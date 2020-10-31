import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../user/application/command/create-user.command';

@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('register')
  async login(
    @Request() req,
    @Res() res: Response,
    @Body() command: CreateUserCommand,
  ) {
    await this.commandBus.execute(command);

    return res.status(HttpStatus.OK).json([]);
  }
}
