import {Module} from '@nestjs/common';
import {HomeRepository} from "./domain/repositories/home.repository";
import {HomeResolvers} from "./infrastructure/graphql/home.resolvers";
import {CreateHomeHandler} from "./application/command/create-home.handler";
import {HomeFactory} from "./domain/services/home.factory";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MysqlHomeRepository} from "./infrastructure/persistence/mysql-home-repository.service";

@Module({
    imports: [TypeOrmModule.forFeature([MysqlHomeRepository])],
    providers: [
        HomeResolvers,
        CreateHomeHandler,
        HomeFactory
    ],
    exports: [
        HomeRepository
    ]
})
export class HomeModule {

}
