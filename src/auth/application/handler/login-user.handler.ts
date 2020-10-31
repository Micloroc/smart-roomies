import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserCommand } from '../command/login-user.command';
import { UserRepository } from '../../../user/domain/user.repository';
import { PasswordEncryptor } from '../../../common/domain/password/password-encryptor';

@Injectable()
@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private userRepository: UserRepository, private passwordEncryptor: PasswordEncryptor) {
  }

  async execute(command: LoginUserCommand) {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) throw new NotFoundException();
    return await this.passwordEncryptor.validate(command.password, user.password);
  }
}