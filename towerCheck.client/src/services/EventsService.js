import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log(res, '[getting all events]');
    const events = res.data.map(e => new Event(e))
    AppState.events = events
    logger.log(AppState.events, '[appstate Events]')
  }

  async createEvent(formData) {
    // logger.log(formData, 'date format stringified?')
    const res = await api.post('api/events', formData)
    // logger.log('creating Event', res.data)
    AppState.events.push(res.data)

  }

  async changeEvent(formData) {
    logger.log('editing event', res.data)

    const res = await api.put(`api/events/${formData.id}`, formData)
    let i = AppState.events.findIndex(e => e.id == formData.id)
    if (i == -1) {
      throw new Error('Error, could not edit. Event not found')
    }
    AppState.events.splice(i, 1, res.data)
    logger.log('event updated in appstate', appstate.events, 'spliced at index:', i)
  }

  async getEventById(eventId) {
    AppState.event = null
    logger.log('fetching event by ID', eventId)
    const res = await api.get(`api/events/${eventId}`)
    logger.log('got event by ID', res.data)
    AppState.event = new Event(res.data)
  }

  async cancelEvent(eventId) {
    const res = await api.remove(`api/events/${eventId}`)
    logger.log('event cancelled', res.data)
    AppState.event = new Event(res.data)
  }



}

export const eventsService = new EventsService();


