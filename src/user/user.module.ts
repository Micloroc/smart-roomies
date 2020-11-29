import {Module, Provider} from '@nestjs/common';
import {CreateUserHandler} from './application/commands/create-user.handler';
import {UserResolvers} from './infrastructure/graphql/user.resolvers';
import {UserCreatedHandler} from './domain/events/user-created.handler';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MysqlUserRepository} from './infrastructure/persistence/mysql-user-repository.service';
import {UserRepository} from './domain/repositories/user.repository';
import {Connection} from 'typeorm';

const UserRepositoryProvider: Provider =
          {
              provide: UserRepository,
              useFactory: connection => connection.getCustomRepository(MysqlUserRepository),
              inject: [Connection]
          };

@Module({
    imports: [
        TypeOrmModule.forFeature([MysqlUserRepository])
    ],
    providers: [
        UserRepositoryProvider,
        CreateUserHandler,
        UserCreatedHandler,
        UserResolvers
    ],
    exports: [UserRepositoryProvider, CreateUserHandler],
})
export class UserModule {
}
