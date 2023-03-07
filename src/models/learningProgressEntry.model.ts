import { Schema, model } from 'mongoose';
import { TLearningProgressEntryDocument, TLearningProgressEntryModel } from '../types/learningProgressEntry.types';


const schema = new Schema<TLearningProgressEntryDocument>({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    progressValues: {
        type: [Number],
        validate: {
            validator: function(arr: Number[]) {
                return arr.length == 5
            },
            message: 'progressValues must contain 5 values'
        }
    }
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

export default model<TLearningProgressEntryDocument, TLearningProgressEntryModel>('LearningProgressEntry', schema, 'learningprogressentries');