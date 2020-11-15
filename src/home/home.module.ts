import {Module, Provider} from '@nestjs/common';
import {HomeRepository} from "./domain/repositories/home.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Home} from "./domain/model/home.entity";
import {HomeSchema} from "./infrastructure/persistence/home.schema";
import {MongooseHomeRepository} from "./infrastructure/persistence/mongoose-home-repository.service";
import {HomeResolvers} from "./infrastructure/graphql/home.resolvers";
import {CreateHomeHandler} from "./application/command/create-home.handler";
import {HomeFactory} from "./domain/services/home.factory";


const HomeRepositoryProvider: Provider = {
    provide: HomeRepository,
    useClass: MongooseHomeRepository
}

@Module({
    imports: [
        MongooseModule.forFeature([{name: Home.name, schema: HomeSchema}]),
    ],
    providers: [
        HomeRepositoryProvider,
        HomeResolvers,
        CreateHomeHandler,
        HomeFactory
    ]
})
export class HomeModule {

}
