import { UserCreated } from './user.created';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreated)
export class UserCreatedHandler
  implements IEventHandler<UserCreated> {

  handle(event: UserCreated) {
  }
}