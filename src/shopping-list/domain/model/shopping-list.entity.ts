import {Column, Entity, PrimaryColumn} from 'typeorm';
import {AggregateRoot} from '@nestjs/cqrs';

@Entity()
export class User extends AggregateRoot {
    @PrimaryColumn()
    public readonly id: string;
    @Column({name: 'password'})
    private readonly _password: string;


    static create(command: CreateUserCommand): User {
        const user = new this(command.id, command.password, command.email, command.firstName, command.lastName);
        user.apply(new UserCreated(command));
        return user;
    }
}
