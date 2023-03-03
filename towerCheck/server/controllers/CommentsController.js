import BaseController from '../utils/BaseController';
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";



export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postComment)
      .delete('/:commentId', this.removeCommentById)

  }
  async postComment(req, res, next) {
    try {
      const postData = req.body
      postData.creatorId = req.userInfo.id
      const comment = await commentsService.postComment(postData)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async removeCommentById(req, res, next) {
    try {
      const commentId = req.params.commentId
      const requestorId = req.userInfo.id
      const message = await commentsService.removeCommentById(commentId, requestorId)
      return res.send(message)

    } catch (error) {
      next(error)
    }
  }

}


