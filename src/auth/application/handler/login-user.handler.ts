import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserCommand } from '../command/login-user.command';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { PasswordEncryptor } from '../../../common/domain/service/password-encryptor';
import { AuthService } from '../service/auth.service';

@Injectable()
@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private passwordEncryptor: PasswordEncryptor,
    private authService: AuthService
  ) {}

  async execute(command: LoginUserCommand) {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await this.passwordEncryptor.validate(
      command.password,
      user.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException();
    return this.authService.login(user);
  }
}
