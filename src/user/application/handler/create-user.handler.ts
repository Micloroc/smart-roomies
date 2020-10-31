import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../command/create-user.command';
import { UserRepository } from '../../domain/user.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserFactory } from '../../domain/user.factory';

@CommandHandler(CreateUserCommand)
@Injectable()
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private userFactory: UserFactory,
  ) {
  }

  async execute(command: CreateUserCommand) {
    let user = await this.userRepository.findById(command.id);
    if (user) throw new ConflictException();
    user = this.userFactory.standardUser(command);
    this.userRepository.save(user);
  }
}
