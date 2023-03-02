import { dbContext } from "../db/DbContext.js";
import { eventsService } from "./EventsService.js";

class CommentsService {
  async postComment(postData) {
    // const event = await eventsService.getEventById(postData.eventId)
    //check for canceled show?

    const comment = await dbContext.Comment.create(postData)
    await comment.populate('creator')
    return comment

  }
}
export const commentsService = new CommentsService();
