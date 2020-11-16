import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CommandBus} from "@nestjs/cqrs";
import {IngredientRepository} from "../../domain/repositories/ingredient.repository";
import {CreateIngredient} from "../../domain/commands/create-ingredient.command";

@Resolver('Ingredient')
export class IngredientResolvers {
    constructor(
        private ingredientRepository: IngredientRepository,
        private commandBus: CommandBus
    ) {}

    @Query('ingredient')
    async getHome(@Args('id') id: string) {
        return this.ingredientRepository.findById(id);
    }

    @Mutation('createIngredient')
    async createHome(@Args('createIngredient') createIngredient: CreateIngredient) {
        console.log(createIngredient);
        await this.commandBus.execute(createIngredient);
    }
}
