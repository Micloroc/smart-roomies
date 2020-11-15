import { HomeCreatedEvent } from './home-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(HomeCreatedEvent)
export class UserCreatedHandler
  implements IEventHandler<HomeCreatedEvent> {

  handle(event: HomeCreatedEvent) {
    console.log(event);
  }
}