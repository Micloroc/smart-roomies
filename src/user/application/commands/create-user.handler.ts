import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {CreateUserCommand} from './create-user.command';
import {UserRepository} from '../../domain/repositories/user.repository';
import {ConflictException, Injectable} from '@nestjs/common';
import {PasswordEncryptor} from '../../../common/domain/service/password-encryptor';
import {User} from '../../domain/models/user.entity';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private userRepository: UserRepository,
        private passwordEncryptor: PasswordEncryptor,
        private publisher: EventPublisher
    ) {
    }

    async execute(command: CreateUserCommand) {
        let user = await this.userRepository.findById(command.id);
        if (user) throw new ConflictException();

        command.password = await this.passwordEncryptor.encrypt(command.password);
        user = User.create(command);

        await this.userRepository.save(user);

        user = this.publisher.mergeObjectContext(user);
        user.commit();
    }
}
