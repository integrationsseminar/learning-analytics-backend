import { Schema, model } from 'mongoose';
import { TTrophyDocument, TTrophyModel, TrophyTiers } from '../types/trophy.types';


const schema = new Schema<TTrophyDocument>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    tiers: [ { type: Number, required: true, enum: Object.values(TrophyTiers) } ],
    deleted: { type: Boolean, default: false }
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

export default model<TTrophyDocument, TTrophyModel>('Trophy', schema, 'trophys');