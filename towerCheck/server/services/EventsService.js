import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

class EventsService {
  async cancelEvent(eventId, requestorId) {
    const event = await this.getEventById(eventId)
    if (event.isCanceled == true) {
      throw new BadRequest('this event is cancelled')
    }
    if (event.creatorId != requestorId) {
      throw new Forbidden('nice try dirtbag')
    }
    event.isCanceled = true
    await event.save()
    return event
  }
  async updateEventById(eventId, eventData, requestorId) {

    const foundEvent = await this.getEventById(eventId)
    if (foundEvent.isCanceled == true) {
      throw new BadRequest('this event is cancelled')
    }
    if (requestorId != foundEvent.creatorId.toString()) {
      throw new BadRequest('nice try dirtbag')
    }
    if (requestorId == foundEvent.creatorId.toString()) {
      foundEvent.description = eventData.description || foundEvent.description
      foundEvent.name = eventData.name || foundEvent.name


    }
    await foundEvent.save()
    return foundEvent
  }
  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('event not found')

    }
    return event
  }
  async getAllEvents() {
    const events = await dbContext.Events.find()
      .populate('creator', 'name picture')
    return events
  }
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator', 'name picture')
    return event
  }

}
export const eventsService = new EventsService();
