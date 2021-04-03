import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ShoppingList } from './domain/model/shopping-list.entity';
import { ShoppingListRepository } from './domain/repositories/shopping-list.repository';
import { MysqlShoppingListRepository } from './infrastructure/persistence/mysql-shopping-list-repository.service';
import { ShoppingListResolvers } from './infrastructure/graphql/shopping-list.resolvers';
import { CreateShoppingListHandler } from './application/handlers/create-shopping-list.handler';

const ShoppingListRepositoryProvider: Provider = {
  provide: ShoppingListRepository,
  useFactory: connection =>
    connection.getCustomRepository(MysqlShoppingListRepository),
  inject: [Connection],
};

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingList])],
  providers: [
    ShoppingListRepositoryProvider,
    ShoppingListResolvers,
    CreateShoppingListHandler,
  ],
  exports: [],
})
export class MealModule {}
