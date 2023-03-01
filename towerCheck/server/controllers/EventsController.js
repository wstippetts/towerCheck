import { Auth0Provider } from "@bcwdev/auth0provider"
import { eventsService } from "../services/EventsService.js";
import BaseController from '../utils/BaseController';


export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('/:eventId', this.getEventById)
      .get('', this.getAllEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:eventId', this.updateEventById)
      .post('', this.createEvent)
      .delete('/:eventId', this.cancelEvent)

  }
  async cancelEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const requestorId = req.userInfo.id
      const event = await eventsService.cancelEvent(eventId, requestorId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async updateEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const eventData = req.body
      const requestorId = req.userInfo.id
      const updatedEvent = await eventsService.updateEventById(eventId, eventData, requestorId)
      return res.send(updatedEvent)
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await eventsService.getEventById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents()
      res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async createEvent(req, res, next) {
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(eventData)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }


}
