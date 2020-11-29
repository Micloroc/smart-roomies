import {CreateUserCommand} from '../../application/commands/create-user.command';

export class UserCreated {
    public readonly occurredOn: Date;

    constructor(public readonly command: CreateUserCommand) {
        this.occurredOn = new Date();
        this.command = command;
    }
}
