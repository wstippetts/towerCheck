import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from '../utils/BaseController';


export class TicketsController extends BaseController {
  constructor() {
    super('/');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('account/tickets', this.getMyTickets)
      .post('api/tickets', this.createTicket)
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
