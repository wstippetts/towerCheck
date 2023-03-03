import { AppState } from "../AppState.js";
import { Attendee } from "../models/Attendee.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async getTicketsByEventId(eventId) {

    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('ticket holders', res.data)
    if (res.data.length) {
      AppState.attendee = res.data.map(a => new Attendee(a))
    }
    AppState.attendee = res.data
    return AppState.attendee

  }

}
export const attendeesService = new AttendeesService();
