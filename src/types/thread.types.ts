import { Schema, Document, Model } from "mongoose"

export type TThread = {
    course: Schema.Types.ObjectId
    createdBy: Schema.Types.ObjectId
    title: string
    description: string
}

export interface TThreadDocument extends TThread, Document {}

export interface TThreadModel extends Model<TThreadDocument>{}