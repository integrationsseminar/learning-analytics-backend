import { Document, Model } from "mongoose"
import { TUserDocument } from './user.types';
import { TrophyTiers, TrophyIdents } from './trophy.types';

export type TUserTrophy = {
    trophy: TrophyIdents
    tier: TrophyTiers
    user: TUserDocument['_id']
}

export interface TUserTrophyDocument extends TUserTrophy, Document {};

export interface TUserTrophyModel extends Model<TUserTrophyDocument> {};

export { TrophyTiers, TrophyIdents };