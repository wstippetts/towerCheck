import { Schema } from "mongoose";
import { basicStringType } from "../db/Constants.js";

export const CommentSchema = new Schema({

  body: { type: String, required: true },

  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  // creator: { type: Schema.Types.ObjectId, ref: 'Event', required: true }

}, { timestamps: true, toJSON: { virtuals: true } })


CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CommentSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'Event'
})