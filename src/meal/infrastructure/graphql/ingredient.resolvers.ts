import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { IngredientRepository } from '../../domain/repositories/ingredient.repository';
import { CreateIngredient } from '../../domain/commands/create-ingredient.command';

@Resolver('Ingredient')
export class IngredientResolvers {
  constructor(
    private ingredientRepository: IngredientRepository,
    private commandBus: CommandBus,
  ) {}

  @Query('ingredient')
  async getIngredient(@Args('id') id: string) {
    return this.ingredientRepository.findById(id);
  }

  @Query('ingredientsByCreatorId')
  async getIngredientsByCreatorId(@Args('id') id: string) {
    return this.ingredientRepository.findByCreatorId(id);
  }

  @Mutation('createIngredient')
  async createHome(
    @Args('createIngredient') createIngredient: CreateIngredient,
  ) {
    await this.commandBus.execute(createIngredient);
  }
}
