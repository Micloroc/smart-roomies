import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateShoppingList } from '../../domain/commands/create-shopping-list.command';
import { ShoppingListRepository } from '../../domain/repositories/shopping-list.repository';

@Resolver('ShoppingList')
export class ShoppingListResolvers {
  constructor(
    private shoppingListRepository: ShoppingListRepository,
    private commandBus: CommandBus,
  ) {}

  @Query('shoppingList')
  async getHome(@Args('id') id: string) {
    return this.shoppingListRepository.findById(id);
  }

  @Mutation('createShoppingList')
  async createMeal(
    @Args('createShoppingList') createShoppingList: CreateShoppingList,
  ) {
    await this.commandBus.execute(createShoppingList);
  }
}
