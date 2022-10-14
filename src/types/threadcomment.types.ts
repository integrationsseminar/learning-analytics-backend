import { Schema, Document, Model } from "mongoose"

export type TThreadComment = {
    thread: Schema.Types.ObjectId
    createdBy: Schema.Types.ObjectId
    message: string
}

export interface TThreadCommentDocument extends TThreadComment, Document {}

export interface TThreadCommentModel extends Model<TThreadCommentDocument>{}