import { Document, Model } from "mongoose"

export type TTrophy = {
    name: TrophyNames
    description: string
    tiers: TrophyTiers[]
    deleted: boolean
}

export enum TrophyTiers {
    NONE   = 0,
    BRONZE = 1,
    SILVER = 2,
    GOLD   = 3
}

export enum TrophyNames {
    CreateThreadComment = "CreateThreadComment",
    SubmitSurveyAnswer = "SubmitSurveyAnswer",
    ReadNotification = "ReadNotification"
}

export interface TTrophyDocument extends TTrophy, Document {};

export interface TTrophyModel extends Model<TTrophyDocument> {};