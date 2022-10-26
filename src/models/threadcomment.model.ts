import { Schema, model } from 'mongoose';
import { TThreadCommentDocument, TThreadCommentModel } from '../types/threadcomment.types';
//import Thread from './thread.model';


const schema = new Schema<TThreadCommentDocument>({
    thread: { type: Schema.Types.ObjectId, ref: "Thread", required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, immutable: true },
    message: { type: String, required: true },
    deleted: {type: Boolean, required: true, default: false},
    createdByOwner: {type: Boolean, required: true, immutable: true}
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