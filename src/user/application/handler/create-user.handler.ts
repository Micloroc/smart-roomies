import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../command/create-user.command';
import { UserRepository } from '../../domain/user.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserFactory } from '../../domain/user.factory';
import { PasswordEncryptor } from '../../../common/domain/password/password-encryptor';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private userFactory: UserFactory,
    private passwordEncryptor: PasswordEncryptor,
  ) {}

  async execute(command: CreateUserCommand) {
    let user = await this.userRepository.findById(command.id);
    if (user) throw new ConflictException();
    command.password = await this.passwordEncryptor.encrypt(command.password);
    user = this.userFactory.standardUser(command);
    await this.userRepository.save(user);
  }
}
