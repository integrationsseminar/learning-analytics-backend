import { Schema, model } from 'mongoose';
import { TThreadDocument, TThreadModel } from '../types/thread.types';


const schema = new Schema<TThreadDocument>({
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true, immutable: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
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

export default model<TThreadDocument, TThreadModel>('Thread', schema, 'threads');