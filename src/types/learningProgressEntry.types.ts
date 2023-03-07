import { Document, Model, Schema } from "mongoose";

export type TLearningProgressEntry = {
    user: Schema.Types.ObjectId, // ref to TUser
    createdAt: Date,
    progressValues: Number[]
}

export interface TLearningProgressEntryDocument extends TLearningProgressEntry, Document {};

export interface TLearningProgressEntryModel extends Model<TLearningProgressEntryDocument>{};