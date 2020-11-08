import { UserCreatedEvent } from './user-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler
  implements IEventHandler<UserCreatedEvent> {

  handle(event: UserCreatedEvent) {
    console.log(event);
  }
}