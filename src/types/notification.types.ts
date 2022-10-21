import { Document, Model } from 'mongoose'
import { TUserDocument } from './user.types';
export type TNotification = {
    user: TUserDocument["_id"]
    title: string,
    message: string,
    read: boolean
}

export interface TNotificationDocument extends TNotification, Document {};

export interface TNotificationModel extends Model<TNotificationDocument>{};