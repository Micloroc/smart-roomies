import { CreateIngredient } from '../../../domain/commands/create-ingredient.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Ingredient } from '../../../domain/models/ingredient.entity';
import { IngredientRepository } from '../../../domain/repositories/ingredient.repository';
import { UserRepository } from '../../../../user/domain/repositories/user.repository';
import { IngredientAlreadyExists } from '../../../domain/exceptions/ingredient-already-exists.exception';

@Injectable()
@CommandHandler(CreateIngredient)
export class CreateIngredientHandler
  implements ICommandHandler<CreateIngredient> {
  constructor(
    private ingredientRepository: IngredientRepository,
    private userRepository: UserRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateIngredient) {
    let ingredient = await this.ingredientRepository.findById(command.id);
    if (ingredient) throw new IngredientAlreadyExists();

    ingredient = Ingredient.create(command);
    await this.ingredientRepository.save(ingredient);

    ingredient = this.publisher.mergeObjectContext(ingredient);
    ingredient.commit();
  }
}
