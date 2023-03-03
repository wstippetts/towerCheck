import { Schema } from "mongoose";
import { basicStringType } from "../db/Constants.js";
import { EventSchema } from "./Event.js";

export const CommentSchema = new Schema({

  body: { ...basicStringType, required: true },

  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  // creator: { type: Schema.Types.ObjectId, ref: 'Event', required: true }

}, { timestamps: true, toJSON: { virtuals: true } })


EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

EventSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'Event'
})