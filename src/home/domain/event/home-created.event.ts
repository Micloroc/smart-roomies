export class HomeCreatedEvent {
  public readonly occurredOn: Date;

  constructor(public readonly homeId: string) {
    this.homeId = homeId;
    this.occurredOn = new Date();
  }
}
