import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { EventSchema } from "../models/Event";
import { CommentSchema } from "../models/Comment.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Event', EventSchema);
  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
