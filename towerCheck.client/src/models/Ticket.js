
export class Ticket {
  constructor(data) {
    this.ticketId = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
    this.profile = data.profile
    this.event = data.event

  }
}
