import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { Event } from "../models/Event.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { router } from "../router.js";
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
    // AppState.event.push(res.data)
    const id = res.data.id
    logger.log(res.data, 'this is the res data on form data')
    logger.log(id, ' this is the id on res.data.id')
    router.push({ name: 'EventDetails', params: { eventId: res.data.id } })


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

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('comments by event ID', res.data)
    AppState.comments = res.data.map(c => new Comment(c))
  }
  async postComment(formData, eventId) {

    logger.log(eventId.eventId, 'this is the event id')

    formData.eventId = eventId
    const res = await api.post('api/comments', formData)
    logger.log('sending comment post', res.data)
  }

  // async getMyEvents() {
  //   const res = await api.get('account/tickets')
  //   logger.log(res, 'getting my events')
  //   const events = res.data.map(e => new Ticket(e))
  //   AppState.myEvents = events
  //   logger.log('my events in appstate!', AppState.myEvents)
  // }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    logger.log('event cancelled', res.data)
    AppState.event = new Event(res.data)
  }

  async removeComment(postId) {

    const res = await api.delete(`api/comments/${postId}`)
    logger.log('removing comment', res.data)
    const commentIndex = AppState.comments.findIndex(c => c.creatorId == postId)
    if (commentIndex !== -1) {
      AppState.comments.splice(commentIndex, 1)
    }
  }



}

export const eventsService = new EventsService();


