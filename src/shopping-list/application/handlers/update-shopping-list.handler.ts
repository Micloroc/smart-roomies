import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateShoppingList } from '../../domain/commands/create-shopping-list.command';
import { ShoppingListRepository } from '../../domain/repositories/shopping-list.repository';
import { ShoppingListAlreadyExists } from '../../domain/exceptions/shopping-list-already-exists.exception';
import { ShoppingList } from '../../domain/model/shopping-list.entity';
import { UpdateShoppingList } from '../../domain/commands/update-shopping-list.command';
import { ShoppingListNotFound } from '../../domain/exceptions/shopping-list-not-found.exception';

@Injectable()
@CommandHandler(UpdateShoppingList)
export class UpdateShoppingListHandler
  implements ICommandHandler<UpdateShoppingList> {
  constructor(
    private shoppingListRepository: ShoppingListRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: UpdateShoppingList) {
    let shoppingList = await this.shoppingListRepository.findById(
      command.shoppingListId,
    );
    if (!shoppingList) throw new ShoppingListNotFound();
    //TODO: Check userId

    shoppingList.update(command);
    await this.shoppingListRepository.save(shoppingList);
    shoppingList = this.publisher.mergeObjectContext(shoppingList);
    shoppingList.commit();
  }
}
