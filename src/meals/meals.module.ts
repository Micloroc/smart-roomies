import {Module, Provider} from '@nestjs/common';
import {IngredientRepository} from "./domain/repositories/ingredient.repository";
import {MongooseIngredientRepository} from "./infrastructure/persistence/mongoose-ingredient-repository.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Ingredient} from "./domain/models/ingredient.entity";
import {IngredientSchema} from "./infrastructure/persistence/ingredient.schema";
import {CreateIngredientHandler} from "./application/handler/command/create-ingredient.handler";
import {IngredientResolvers} from "./infrastructure/graphql/ingredient.resolvers";
import {UserModule} from "../user/user.module";

const IngredientRepositoryProvider: Provider = {
    provide: IngredientRepository,
    useClass: MongooseIngredientRepository
}

@Module({
    imports: [
        MongooseModule.forFeature([{name: Ingredient.name, schema: IngredientSchema}]),
        UserModule
    ],
    providers: [
        IngredientRepositoryProvider,
        CreateIngredientHandler,
        IngredientResolvers,
    ],
    exports: [],
})
export class MealsModule {
}
