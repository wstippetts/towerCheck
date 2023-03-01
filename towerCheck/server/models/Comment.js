import mongoose from 'mongoose'
export const Schema = mongoose.Schema

export const CommentSchema = new Schema({

}, { timestamps: true, toJSON: { virtuals: true } })
