import mongoose from 'mongoose';

import Trophy from '../models/trophy.model';
import { ITrophy } from './Trophy';
import { TrophyTiers, TrophyNames } from '../types/trophy.types';

import { TUserDocument } from '../types/user.types';

import ThreadComment from './../models/threadcomment.model';
import Notification from './../models/notification.model';
import Survey from './../models/survey.model';

export class CreateThreadCommentTrophy implements ITrophy {
    public async check(user: TUserDocument) {
        const trophy = await this.setup();
        const threadCommentCount = await ThreadComment.count({ createdBy: user._id });

        if(threadCommentCount > 0) {
            return { tier: TrophyTiers.BRONZE, trophyId: trophy._id }
        }

        return { tier: TrophyTiers.NONE, trophyId: trophy._id }
    }

    public async setup(): Promise<mongoose.Types.ObjectId> {
        const trophy = await Trophy.findOneAndUpdate(
            { name: TrophyNames.CreateThreadComment, deleted: { $ne: true } },
            { tiers: [ TrophyTiers.NONE, TrophyTiers.BRONZE, TrophyTiers.SILVER, TrophyTiers.GOLD ] },
            { upsert: true }
        );

        if(!trophy) {
            throw new Error('Something went wrong while setting up the trophy')
        }

        return trophy._id;
    }
}

export class ReadNotificationTrophy implements ITrophy {
    public async check(user: TUserDocument) {
        const trophy = await this.setup();

        const readNotificationCount = await Notification.count({ read: true, user: user._id });

        if(readNotificationCount > 0) {
            return { tier: TrophyTiers.BRONZE, trophyId: trophy._id }
        }

        return { tier: TrophyTiers.NONE, trophyId: trophy._id }
    }
    
    public async setup(): Promise<mongoose.Types.ObjectId> {
        const trophy = await Trophy.findOneAndUpdate(
            { name: TrophyNames.ReadNotification, deleted: { $ne: true } },
            { tiers: [ TrophyTiers.NONE, TrophyTiers.BRONZE, TrophyTiers.SILVER, TrophyTiers.GOLD ] },
            { upsert: true }
        );

        if(!trophy) {
            throw new Error('Something went wrong while setting up the trophy')
        }

        return trophy._id;
    }
}

export class SubmitSurveyAnswerTrophy implements ITrophy {
    public async check(user: TUserDocument) {
        const trophy = await this.setup();

        const surveyAnswerCount = await Survey.count({ 'answers.user': user._id })

        if(surveyAnswerCount > 0) {
            return { tier: TrophyTiers.BRONZE, trophyId: trophy._id }
        }

        return { tier: TrophyTiers.NONE, trophyId: trophy._id }
    }
    
    public async setup(): Promise<mongoose.Types.ObjectId> {
        const trophy = await Trophy.findOneAndUpdate(
            { name: TrophyNames.SubmitSurveyAnswer, deleted: { $ne: true } },
            { tiers: [ TrophyTiers.NONE, TrophyTiers.BRONZE, TrophyTiers.SILVER, TrophyTiers.GOLD ] },
            { upsert: true }
        );

        if(!trophy) {
            throw new Error('Something went wrong while setting up the trophy')
        }

        return trophy._id;
    }
}