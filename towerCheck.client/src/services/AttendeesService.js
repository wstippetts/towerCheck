import { AppState } from "../AppState.js";
import { Attendee } from "../models/Attendee.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async getTicketsByEventId(eventId) {

    await api.get(`api/events/${eventId}/tickets`)
    logger.log('ticket holders', res.data)
    if (!res.data) {
      throw new Error('no guests found')
    }
    // AppState.attendee = res.data.map(a=>new Attendee(a))

  }

}
export const attendeesService = new AttendeesService();
