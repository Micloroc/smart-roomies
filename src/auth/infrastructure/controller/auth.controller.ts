import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../user/application/commands/create-user.command';
import { IdFactory } from '../../../common/domain/service/id.factory';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LoginUserCommand } from '../../application/command/login-user.command';

@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus, private idFactory: IdFactory) {
  }

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

  @Post('login')
  async login(
    @Request() req,
    @Res() res: Response,
    @Body() command: LoginUserCommand,
  ) {
    const token = await this.commandBus.execute(command);
    return res.status(HttpStatus.OK).json({ token });
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Request() req) {
    return 'OK';
  }
}
