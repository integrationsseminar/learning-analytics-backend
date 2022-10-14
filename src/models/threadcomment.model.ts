import { Schema, model } from 'mongoose';
import { TThreadCommentDocument, TThreadCommentModel } from '../types/threadcomment.types';


const schema = new Schema<TThreadCommentDocument>({
    thread: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, immutable: true },
    message: { type: String, required: true }
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

export default model<TThreadCommentDocument, TThreadCommentModel>('ThreadComment', schema, 'threadcomments');