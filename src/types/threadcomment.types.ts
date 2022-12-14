import { Document, Model } from "mongoose"
import { TThreadDocument } from "./thread.types"
import { TUserDocument } from "./user.types"

export type TThreadComment = {
    thread: TThreadDocument["_id"]
    createdBy: TUserDocument['_id']
    message: string
    deleted: boolean
    createdByOwner?: boolean 
}

export interface TThreadCommentDocument extends TThreadComment, Document { }

export interface TThreadCommentModel extends Model<TThreadCommentDocument> { }