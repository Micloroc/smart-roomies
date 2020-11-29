import {CreateUserCommand} from '../../application/commands/create-user.command';
import {Column, Entity, PrimaryColumn} from 'typeorm';
import {AggregateRoot} from '@nestjs/cqrs';
import {UserCreated} from '../events/user.created';

@Entity()
export class User extends AggregateRoot {
    @PrimaryColumn()
    public readonly id: string;
    @Column({name: 'password'})
    private _password: string;
    @Column({name: 'email'})
    private _email: string;
    @Column({name: 'firstName'})
    private _firstName: string;
    @Column({name: 'lastName'})
    private _lastName: string;

    constructor(id: string, password: string, email: string, firstName: string, lastName: string) {
        super();
        this.id = id;
        this._password = password;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
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

    static create(command: CreateUserCommand): User {
        const user = new this(command.id, command.password, command.email, command.firstName, command.lastName);
        user.apply(new UserCreated(command));
        return user;
    }
}
