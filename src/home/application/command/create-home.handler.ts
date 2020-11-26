import {ConflictException, Injectable} from '@nestjs/common';
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs';
import {CreateHome} from '../../domain/command/create.home';
import {HomeRepository} from '../../domain/repositories/home.repository';
import {HomeFactory} from '../../domain/services/home.factory';
import {HomeCreated} from '../../domain/event/home.created';
import {HomeAlreadyExists} from "../../domain/exceptions/home-already-exists.exception";


@Injectable()
@CommandHandler(CreateHome)
export class CreateHomeHandler implements ICommandHandler<CreateHome> {

    constructor(private homeRepository: HomeRepository, private homeFactory: HomeFactory, private eventBus: EventBus) {
    }

    async execute(command: CreateHome) {
        let home = await this.homeRepository.findById(command.id);
        if (home) throw new HomeAlreadyExists();

        home = this.homeFactory.new(command);
        await this.homeRepository.save(home);

        this.eventBus.publish(new HomeCreated(home.id));
    }
}