export class UserCreatedEvent {
  public readonly occurredOn: Date;

  constructor(public readonly userId: string) {
    this.userId = userId;
    this.occurredOn = new Date();
  }
}
