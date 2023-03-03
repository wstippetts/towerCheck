import { AppState } from "../AppState.js";
import { EventTicket } from "../models/Event.js";
import { Ticket } from "../models/Ticket.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async getTicketsByEventId(eventId) {

    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('ticket holders', res.data)
    if (res.data.length) {
      AppState.ticket = res.data.map(a => new Ticket(a))
    }
    AppState.ticket = res.data
    return AppState.ticket

  }

  async createTicket(eventData) {
    const res = await api.post('api/tickets', eventData)
    logger.log('printing ticket ', res.data)
    AppState.ticket.push(new Ticket(res.data))

    AppState.myEvents.push(new EventTicket(res.data))
  }

  async returnTicket(eventTicketId) {
    try {
      const res = await api.delete(`api/tickets/${eventTicketId}`)
      logger.log('returning ticket', res.data)
      const ticketIndex = AppState.ticket.findIndex(t => t.eventTicketId == eventTicketId)
      if (ticketIndex !== -1) {
        AppState.ticket.splice(ticketIndex, 1)
      }
    } catch (error) {
      logger.error(error)
      Pop.error(error)
    }
  }

  async getMyEventTickets() {
    const res = await api.get('account/tickets')
    logger.log('getting my event tickets', res.data)
    if (res.data.length) {
      AppState.myTickets = res.data.map(t => new Ticket(t))

    }
    AppState.myTickets = []


  }



}
export const attendeesService = new AttendeesService();
