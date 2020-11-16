import {Home} from '../model/home.entity';
import {CreateHomeCommand} from '../../application/command/create-home.command';

export class HomeFactory {
    new(command: CreateHomeCommand) {
        return new Home(command.id, command.title, command.description, command.adminIds, command.userIds,
            command.currency);
    }


}
