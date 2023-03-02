import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from '../utils/BaseController';


export class TicketsController extends BaseController {
  constructor() {
    super('');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/account/tickets', this.getMyTickets)
      .get('/api/events/:eventId/tickets', this.getAllTicketsByEvent)
      .post('/api/tickets', this.createTicket)
      .delete('/api/tickets/:ticketId', this.deleteTicketById)
  }

  async deleteTicketById(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const ticketId = req.params.ticketId
      const removedTicket = await ticketsService.deleteTicketById(ticketId, accountId)
      return res.send(removedTicket)
    } catch (error) {
      next(error)
    }
  }
  async getAllTicketsByEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const eventTickets = await ticketsService.getAllTicketsByEvent(eventId)
      return res.send(eventTickets)
    } catch (error) {
      next(error)
    }

  }
  async getMyTickets(req, res, next) {
    try {

      const accountId = req.userInfo.id
      const tickets = await ticketsService.getMyTickets(accountId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async createTicket(req, res, next) {
    try {
      const event = req.body
      event.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(event)

      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}
