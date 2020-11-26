export class HomeCreated {
  public readonly occurredOn: Date;
  public readonly homeId: string
  
  constructor(homeId: string) {
    this.homeId = homeId;
    this.occurredOn = new Date();
  }
}
