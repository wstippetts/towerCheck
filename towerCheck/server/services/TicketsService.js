import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
  async deleteTicketById(ticketId, accountId) {
    const removeTicket = await dbContext.Tickets.findById(ticketId).populate('event')
    if (!removeTicket) {
      throw new BadRequest('ticket not found')
    }
    if (accountId != removeTicket.accountId) {
      throw new BadRequest('not your ticket!')
    }
    // const event = await eventsService.getEventById(removeTicket.eventId)
    const event = await dbContext.Events.findById(removeTicket.eventId).populate('creator')
    await removeTicket.remove()
    if (event) {
      event.capacity = event.capacity + 1
      await event.save()
    }
    return 'Ticket go bye bye, we are still charging you though'
  }
  async getAllTicketsByEvent(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId }).populate('profile event')
    return eventTickets
  }
  async getMyTickets(accountId) {

    const myTickets = await dbContext.Tickets.find({ accountId }).populate('event profile')
    // await myTickets.save()
    return myTickets
  }
  async createTicket(ticketData) {
    const event = await eventsService.getEventById(ticketData.eventId)
    if (event.isCanceled || event.capacity <= 0) {
      throw new BadRequest('Sorry no longer available')
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    event.capacity -= 1
    await event.save()
    await ticket.populate('event profile')
    return ticket
  }

}
export const ticketsService = new TicketsService();
