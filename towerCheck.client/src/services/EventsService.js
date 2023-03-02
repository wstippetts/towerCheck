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
}
export const eventsService = new EventsService();
