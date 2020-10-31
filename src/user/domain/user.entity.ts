import { CreateUserCommand } from '../application/command/create-user.command';

export class User {
  id: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(command: CreateUserCommand) {
    this.id = command.id;
    this.password = command.password;
    this.email = command.email;
    this.firstName = command.firstName;
    this.lastName = command.lastName;
  }
}