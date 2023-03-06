import { Document, Model } from "mongoose"

export type TTrophy = {
    identifier: TrophyIdents
    description: string
    availableTiers: {
        tier: TrophyTiers
        description: string
    }[]
}

export enum TrophyTiers {
    NONE   = 0,
    BRONZE = 1,
    SILVER = 2,
    GOLD   = 3
}

export enum TrophyIdents {
    CreateThreadComment = "CreateThreadComment",
    SubmitSurveyAnswer = "SubmitSurveyAnswer",
    ReadNotification = "ReadNotification"
}

export interface TTrophyDocument extends TTrophy, Document {};

export interface TTrophyModel extends Model<TTrophyDocument> {};