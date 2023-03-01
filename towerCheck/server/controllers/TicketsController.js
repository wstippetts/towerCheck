import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from '../utils/BaseController';


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
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
