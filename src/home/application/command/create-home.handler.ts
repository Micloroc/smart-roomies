import {Injectable} from '@nestjs/common';
import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {CreateHome} from '../../domain/command/create.home';
import {HomeRepository} from '../../domain/repositories/home.repository';
import {HomeAlreadyExists} from "../../domain/exceptions/home-already-exists.exception";
import {Home} from '../../domain/model/home.entity';


@Injectable()
@CommandHandler(CreateHome)
export class CreateHomeHandler implements ICommandHandler<CreateHome> {

    constructor(private homeRepository: HomeRepository,
                private publisher: EventPublisher) {
    }

    async execute(command: CreateHome) {
        let home = await this.homeRepository.findById(command.id);
        if (home) throw new HomeAlreadyExists();

        home = Home.create(command);
        await this.homeRepository.save(home);
        home = this.publisher.mergeObjectContext(home);
        home.commit();
    }
}