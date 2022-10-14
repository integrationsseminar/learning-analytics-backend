import { Schema, model } from 'mongoose';
import { TThreadDocument, TThreadModel } from '../types/thread.types';


const schema = new Schema<TThreadDocument>({
    course: { type: Schema.Types.ObjectId, ref: 'courses', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true, immutable: true },
    title: { type: String, required: true },
    description: { type: String, required: false }
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

export default model<TThreadDocument, TThreadModel>('Thread', schema, 'threads');