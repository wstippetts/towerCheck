import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
  async createTicket(ticketData) {
    const event = await eventsService.getEventById(ticketData.eventId)
    if (event.isCanceled || event.capacity <= 0) {
      throw new BadRequest('Sorry no longer available')
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    event.capacity -= event.capacity
    await ticket.populate('profile')
    event.save()
    return ticket
  }

}
export const ticketsService = new TicketsService();
