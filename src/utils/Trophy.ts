import mongoose from 'mongoose';

import UserTrophy from '../models/usertrophy.model';

import { TrophyTiers, TrophyNames } from '../types/trophy.types';
import { TUserDocument } from '../types/user.types';

import { CreateThreadCommentTrophy, ReadNotificationTrophy, SubmitSurveyAnswerTrophy } from './trophyTypes';

export interface ITrophy {
    check(user: TUserDocument): Promise<{ tier: TrophyTiers, trophyId: mongoose.Types.ObjectId }>
    setup(): Promise<mongoose.Types.ObjectId>
}

export class TrophyFactory {
    public static get(name: TrophyNames): ITrophy {
        switch(name) {
            case TrophyNames.CreateThreadComment:
                return new CreateThreadCommentTrophy();
            case TrophyNames.ReadNotification:
                return new ReadNotificationTrophy();
            case TrophyNames.SubmitSurveyAnswer:
                return new SubmitSurveyAnswerTrophy();
        }
    }
}

export class TrophyExecutor {
    public static async execute(user: TUserDocument, trophy: ITrophy) {
        const userTrophyData = await trophy.check(user);

        await UserTrophy.findOneAndUpdate({
            trophy: userTrophyData.trophyId,
            user: user._id
        }, { tier: userTrophyData.tier }, { upsert: true });
    }
}