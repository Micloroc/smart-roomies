import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../user/application/command/create-user.command';
import { IdFactory } from '../../../common/domain/id/id.factory';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LoginUserCommand } from '../../application/command/login-user.command';

@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus, private idFactory: IdFactory) {}

  @Post('register')
  async register(
    @Request() req,
    @Res() res: Response,
    @Body() command: CreateUserCommand,
  ) {
    command.id = this.idFactory.id();
    await this.commandBus.execute(command);

    return res.status(HttpStatus.OK).json([]);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req,  @Res() res: Response, @Body() command: LoginUserCommand) {
    const token = await this.commandBus.execute(command)
    console.log(token);

    return res.status(HttpStatus.OK).json({token});
  }
}
