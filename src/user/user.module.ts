import {Module} from '@nestjs/common';
import {CreateUserHandler} from './application/commands/create-user.handler';
import {UserFactory} from './domain/services/user.factory';
import {UserResolvers} from './infrastructure/graphql/user.resolvers';
import {UserCreatedHandler} from './domain/events/user-created.handler';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MysqlUserRepository} from './infrastructure/persistence/mysql-user-repository.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MysqlUserRepository])
    ],
    providers: [
        MysqlUserRepository,
        UserFactory,
        CreateUserHandler,
        UserCreatedHandler,
        UserResolvers
    ],
    exports: [MysqlUserRepository, CreateUserHandler],
})
export class UserModule {
}
