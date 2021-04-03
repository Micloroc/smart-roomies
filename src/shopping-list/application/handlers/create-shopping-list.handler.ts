import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateShoppingList } from '../../domain/commands/create-shopping-list.command';
import { ShoppingListRepository } from '../../domain/repositories/shopping-list.repository';
import { ShoppingListAlreadyExists } from '../../domain/exceptions/shopping-list-already-exists.exception';
import { ShoppingList } from '../../domain/model/shopping-list.entity';

@Injectable()
@CommandHandler(CreateShoppingList)
export class CreateShoppingListHandler
  implements ICommandHandler<CreateShoppingList> {
  constructor(
    private shoppingListRepository: ShoppingListRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateShoppingList) {
    let shoppingList = await this.shoppingListRepository.findById(
      command.shoppingListId,
    );
    if (shoppingList) throw new ShoppingListAlreadyExists();
    //TODO: Check userId

    shoppingList = ShoppingList.create(command);
    await this.shoppingListRepository.save(shoppingList);
    shoppingList = this.publisher.mergeObjectContext(shoppingList);
    shoppingList.commit();
  }
}
