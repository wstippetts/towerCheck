import mongoose from 'mongoose'
import { basicStringType } from "../db/Constants.js"
import { TicketSchema } from "./Ticket.js"
export const Schema = mongoose.Schema

export const EventSchema = new Schema({

  name: basicStringType,
  description: { ...basicStringType, maxLength: 1000 },
  coverImg: { ...basicStringType, maxLength: 5000 },
  location: basicStringType,
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  type: { ...basicStringType, enum: ['concert', 'convention', 'sport', 'digital'] },
  isCanceled: { type: Boolean, default: false, required: true },

  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  // ticketId: { type: TicketSchema, ref: 'Ticket', required: true }

}, { timestamps: true, toJSON: { virtuals: true } })


EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

EventSchema.virtual('ticket', {
  localField: 'ticketId',
  foreignField: '_id',
  ref: 'Ticket'
})