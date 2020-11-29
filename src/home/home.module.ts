import {Module, Provider} from '@nestjs/common';
import {HomeRepository} from "./domain/repositories/home.repository";
import {HomeResolvers} from "./infrastructure/graphql/home.resolvers";
import {CreateHomeHandler} from "./application/command/create-home.handler";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MysqlHomeRepository} from "./infrastructure/persistence/mysql-home-repository.service";
import {Connection} from 'typeorm';

const HomeRepositoryProvider: Provider =
          {
              provide: HomeRepository,
              useFactory: connection => connection.getCustomRepository(MysqlHomeRepository),
              inject: [Connection]
          };

@Module({
    imports: [TypeOrmModule.forFeature([MysqlHomeRepository])],
    providers: [
        HomeRepositoryProvider,
        HomeResolvers,
        CreateHomeHandler,
    ],
    exports: [
        HomeRepository
    ]
})
export class HomeModule {

}
