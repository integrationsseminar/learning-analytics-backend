import { Schema, model } from 'mongoose';
import { TUserTrophyDocument, TUserTrophyModel, TrophyTiers } from '../types/usertrophy.types';


const schema = new Schema<TUserTrophyDocument>({
    trophy: { type: Schema.Types.ObjectId, required: true, ref: 'Trophy' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    tier: { type: Number, required: true, enum: Object.values(TrophyTiers) }
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