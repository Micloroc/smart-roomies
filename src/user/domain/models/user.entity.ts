import {CreateUserCommand} from '../../application/commands/create-user.command';

export class User {
    public readonly id: string;
    private _password: string;
    private _email: string;
    private _firstName: string;
    private _lastName: string;

    constructor(command: CreateUserCommand) {
        this.id = command.id;
        this._password = command.password;
        this._email = command.email;
        this._firstName = command.firstName;
        this._lastName = command.lastName;
    }

    get password(): string {
        return this._password;
    }

    get email(): string {
        return this._email;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }
}
