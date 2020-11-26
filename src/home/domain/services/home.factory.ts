import {Home} from '../model/home.entity';
import {CreateHome} from '../command/create.home';

export class HomeFactory {
    new(command: CreateHome) {
        return new Home(command.id, command.title, command.description, command.adminIds, command.userIds,
            command.currency);
    }
}
