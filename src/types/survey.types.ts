import { Document, Model } from "mongoose";
import { Schema as JSONSchema } from 'ajv';

import { TUserDocument } from './user.types';
import { TCourseDocument } from './course.types';

export type TSurvey = {
    title: string
    description: string | null
    users: TUserDocument['_id'][]
    course?: TCourseDocument['_id']
    answerType: JSONSchema
    answers: {
        user: TUserDocument['_id']
        answer: any
    }[]
    deleted: boolean
    createdBy: TUserDocument['_id']
}

export interface TSurveyDocument extends TSurvey, Document {}

export interface TSurveyModel extends Model<TSurveyDocument>{}