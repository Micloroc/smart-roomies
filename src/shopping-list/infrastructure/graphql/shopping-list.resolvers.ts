import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateShoppingList } from '../../domain/commands/create-shopping-list.command';
import { ShoppingListRepository } from '../../domain/repositories/shopping-list.repository';
import { UpdateShoppingList } from '../../domain/commands/update-shopping-list.command';

@Resolver('ShoppingList')
export class ShoppingListResolvers {
  constructor(
    private shoppingListRepository: ShoppingListRepository,
    private commandBus: CommandBus,
  ) {}

  @Query('shoppingList')
  async shoppingList(@Args('id') id: string) {
    return await this.shoppingListRepository.findById(id);
  }

  @Mutation('createShoppingList')
  async createShoppingList(
    @Args('createShoppingList') createShoppingList: CreateShoppingList,
  ) {
    await this.commandBus.execute(createShoppingList);
  }

  @Mutation('updateShoppingList')
  async updateShoppingList(
    @Args('updateShoppingList') updateShoppingList: UpdateShoppingList,
  ) {
    await this.commandBus.execute(updateShoppingList);
  }
}
