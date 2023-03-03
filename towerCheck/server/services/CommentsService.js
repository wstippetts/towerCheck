import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class CommentsService {
  async getCommentsByEvent(eventId) {
    const event = await eventsService.getEventById(eventId)
    if (!event) {
      throw new BadRequest('bad request')
    }
    const comments = await dbContext.Comments.find({ eventId }).populate('creator event')
    return comments
  }
  async postComment(postData) {

    const event = await eventsService.getEventById(postData.eventId)
    if (!event) {
      throw new BadRequest('bad request')
    }
    // if (event.isCanceled) {
    //   throw new Forbidden('Sending care package, yup it is a virus.')
    // }
    //check for canceled show?

    const comment = await dbContext.Comments.create(postData)
    await comment.populate('creator event')
    return comment

  }
}
export const commentsService = new CommentsService();
