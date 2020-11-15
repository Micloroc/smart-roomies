import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '../../domain/repositories/user.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserFactory } from '../../domain/services/user.factory';
import { PasswordEncryptor } from '../../../common/domain/service/password-encryptor';
import { UserCreatedEvent } from '../../domain/events/user-created.event';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private userFactory: UserFactory,
    private passwordEncryptor: PasswordEncryptor,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand) {
    let user = await this.userRepository.findById(command.id);
    if (user) throw new ConflictException();

    command.password = await this.passwordEncryptor.encrypt(command.password);
    user = this.userFactory.new(command);
    await this.userRepository.save(user);

    this.eventBus.publish(new UserCreatedEvent(user.id));

  }
}
