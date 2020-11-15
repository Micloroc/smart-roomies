import { User } from '../models/user.entity';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactory {
  new(command: CreateUserCommand): User {
    return new User(command);
  }
}
