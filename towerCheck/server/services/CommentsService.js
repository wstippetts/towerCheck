import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class CommentsService {
  async postComment(postData) {

    const event = await eventsService.getEventById(postData.eventId)
    if (!event) {
      throw new BadRequest
    }
    //check for canceled show?

    const comment = await dbContext.Comments.create(postData)
    await comment.populate('creator event')
    return comment

  }
}
export const commentsService = new CommentsService();
