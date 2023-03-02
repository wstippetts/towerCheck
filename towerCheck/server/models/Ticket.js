import { Schema } from "mongoose";

export const TicketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },

}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true,
})

TicketSchema.virtual('event', {
  localField: 'eventId',
  ref: 'Event',
  foreignField: '_id',
  justOne: true,
})


// TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })
