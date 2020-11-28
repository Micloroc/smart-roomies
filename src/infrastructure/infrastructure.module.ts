import {Global, Module} from '@nestjs/common';
import {CommonModule} from '../common/common.module';
import {CqrsModule} from '@nestjs/cqrs';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {TypeOrmModule} from "@nestjs/typeorm";

@Global()
@Module({
    imports: [
        CommonModule,
        CqrsModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('MYSQL_HOST'),
                port: configService.get<number>('MYSQL_PORT'),
                username: configService.get('MYSQL_USER'),
                password: configService.get('MYSQL_PASSWORD'),
                database: configService.get('MYSQL_DATABASE'),
                autoLoadEntities:true,
                synchronize: true,
            }),
            inject: [ConfigService],
        })
    ],

    exports: [CqrsModule, CommonModule, ConfigModule]
})
export class InfrastructureModule {
}

