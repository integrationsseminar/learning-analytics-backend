import { Document, Model } from "mongoose"
import { TUserDocument } from './user.types';
import { TTrophyDocument, TrophyTiers } from './trophy.types';

export type TUserTrophy = {
    trophy: TTrophyDocument['_id'] 
    tier: TrophyTiers
    user: TUserDocument['_id']
}

export enum TrophyNames {
    CreateNotification = "CreateNotification",
    SubmitSurveyAnswer = "SubmitSurveyAnswer",
    ReadNotification = "ReadNotification"
}

export interface TUserTrophyDocument extends TUserTrophy, Document {};

export interface TUserTrophyModel extends Model<TUserTrophyDocument> {};

export { TrophyTiers };