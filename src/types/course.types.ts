import { Document, Model } from 'mongoose'
import { TUserDocument } from './user.types';

export enum ProgressTypes {
    BYDATE = 'ByDate'
}

export type TCourse = {
    members: TUserDocument['_id'][],
    owner: TUserDocument['_id'],
    name: string,
    start: Date,
    end: Date,
    color: string,
    progressType: ProgressTypes
}

export interface TCourseDocument extends TCourse, Document {};

export interface TCourseModel extends Model<TCourseDocument>{};