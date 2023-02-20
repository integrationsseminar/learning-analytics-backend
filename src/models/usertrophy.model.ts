import { Schema, model } from 'mongoose';
import { TUserTrophyDocument, TUserTrophyModel, TrophyTiers, TrophyIdents } from '../types/usertrophy.types';


const schema = new Schema<TUserTrophyDocument>({
    trophy: { type: String, enum: TrophyIdents, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    tier: { type: Number, required: true, enum: TrophyTiers }
},
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        },
        timestamps: { createdAt: 'createdAt' }
    });

export default model<TUserTrophyDocument, TUserTrophyModel>('UserTrophy', schema, 'usertrophys');