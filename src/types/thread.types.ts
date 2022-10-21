import { Document, Model } from "mongoose"
import { TCourseDocument } from "./course.types"
import { TUserDocument } from "./user.types"

export type TThread = {
    course: TCourseDocument["_id"]
    createdBy: TUserDocument["_id"]
    title: string
    description: string
    deleted: boolean
}

export interface TThreadDocument extends TThread, Document {}

export interface TThreadModel extends Model<TThreadDocument>{}