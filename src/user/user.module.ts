import { Module, Provider } from '@nestjs/common';
import { MongooseUserRepository } from './infrastructure/persistence/mongoose-user-repository.service';
import { UserSchema } from './infrastructure/persistence/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './domain/user.entity';
import { CommonModule } from '../common/common.module';
import { CreateUserHandler } from './application/commands/create-user.handler';
import { UserFactory } from './domain/user.factory';
import { UserRepository } from './domain/user.repository';
import { UserResolvers } from './infrastructure/graphql/user.resolvers';
import { UserCreatedHandler } from './domain/events/user-created.handler';

const UserRepositoryProvider: Provider =
  {
    provide: UserRepository,
    useClass: MongooseUserRepository,
  };

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    MongooseUserRepository,
    UserFactory,
    UserRepositoryProvider,
    CreateUserHandler,
    UserCreatedHandler,
    UserResolvers
  ],
  exports: [UserRepositoryProvider, CreateUserHandler],
})
export class UserModule {}
