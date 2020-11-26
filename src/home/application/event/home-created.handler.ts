import { HomeCreated } from '../../domain/event/home.created';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(HomeCreated)
export class HomeCreatedHandler
  implements IEventHandler<HomeCreated> {

  handle(event: HomeCreated) {
    console.log(event);
  }
}