import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserCommand } from '../../application/command/login-user.command';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { CreateUserCommand } from '../../../user/application/commands/create-user.command';

@Resolver('Meal')
export class AuthResolvers {
  constructor(
    private userRepository: UserRepository,
    private commandBus: CommandBus,
  ) {}

  @Mutation('login')
  async login(@Args('login') loginUserCommand: LoginUserCommand) {
    console.log(loginUserCommand);
    return await this.commandBus.execute(loginUserCommand);
  }

  @Mutation('register')
  async register(@Args('register') createUserCommand: CreateUserCommand) {
    return await this.commandBus.execute(createUserCommand);
  }
}
