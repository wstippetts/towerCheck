import mongoose from 'mongoose'
import { basicStringType } from "../db/Constants.js"
export const Schema = mongoose.Schema

export const EventSchema = new Schema({

  name: basicStringType,
  description: basicStringType,
  coverImg: { ...basicStringType, maxLength: 5000 },
  location: basicStringType,
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  type: { ...basicStringType, enum: ['concert', 'convention', 'sport', 'digital'] },

  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }


}, { timestamps: true, toJSON: { virtuals: true } })


EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})