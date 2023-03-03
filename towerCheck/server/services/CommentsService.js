import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "./EventsService.js";

class CommentsService {


  async removeCommentById(commentId, requestorId) {
    if (!commentId) {
      throw new BadRequest('could not find comment by id')
    }
    const comment = await dbContext.Comments.findById(commentId).populate('creator')
    if (comment) {
      // @ts-ignore
      if (comment.creatorId.toString() !== requestorId) {
        throw new Forbidden('nice try bad guy')
      }
      logger.log(comment.creatorId.toString(), "creator Id stringifyed")
      logger.log(requestorId)
      await comment.remove()
      return 'comment removed'
    }

  }
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
