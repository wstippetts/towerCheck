
export class Attendee {
  constructor(data) {
    super(data.profile)
    this.eventId = data.eventId
    this.accountId = data.accountId
    this.profile = data.profile
    this.event = data.event

  }
}
