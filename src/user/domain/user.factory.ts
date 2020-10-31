import { User } from './user.entity';
import { CreateUserCommand } from '../application/command/create-user.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactory {
  standardUser(command: CreateUserCommand): User {
    return new User(command);
  }
}
