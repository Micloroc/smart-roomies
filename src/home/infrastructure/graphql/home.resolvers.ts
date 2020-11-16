import {HomeRepository} from "../../domain/repositories/home.repository";
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Home} from "../../domain/model/home.entity";
import {CreateHomeCommand} from "../../application/command/create-home.command";
import {CommandBus} from "@nestjs/cqrs";

@Resolver('Home')
export class HomeResolvers {
    constructor(
        private homeRepository: HomeRepository,
        private commandBus: CommandBus
    ) {}

    @Query('home')
    async getHome(@Args('id') id: string) {
        return this.homeRepository.findById(id);
    }

    @Mutation('createHome')
    async createHome(@Args('createHome') createHomeInput: CreateHomeCommand) {
        await this.commandBus.execute(createHomeInput);
    }
}
