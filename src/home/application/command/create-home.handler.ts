import {ConflictException, Injectable} from '@nestjs/common';
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs';
import {CreateHomeCommand} from './create-home.command';
import {HomeRepository} from '../../domain/repositories/home.repository';
import {HomeFactory} from '../../domain/services/home.factory';
import {HomeCreatedEvent} from '../../domain/event/home-created.event';


@Injectable()
@CommandHandler(CreateHomeCommand)
export class CreateHomeHandler implements ICommandHandler<CreateHomeCommand> {

    constructor(private homeRepository: HomeRepository, private homeFactory: HomeFactory, private eventBus: EventBus) {
    }

    async execute(command: CreateHomeCommand) {
        let home = await this.homeRepository.findById(command.id);
        if (home) throw new ConflictException();

        home = this.homeFactory.new(command);
        await this.homeRepository.save(home);

        this.eventBus.publish(new HomeCreatedEvent(home.id));
    }
}