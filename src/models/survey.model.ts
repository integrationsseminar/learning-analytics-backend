import { Schema, model } from 'mongoose';
import Ajv from 'ajv';

import { TSurveyDocument, TSurveyModel } from '../types/survey.types';

const schema = new Schema<TSurveyDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: false, immutable: true },
    answerType: {
        type: Schema.Types.Mixed, validate: {
            validator: function (v: any) {
                if(!v) {
                    return false;
                }

                const ajv = new Ajv();
                return ajv.validateSchema(v);
            },
            message: (props: any) => `json schema is invalid: ${JSON.stringify(props, null, 4)}`
        },
        required: true
    },
    answers: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            answer: { type: Schema.Types.Mixed, ref: 'User', required: true },
        }
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
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

export default model<TSurveyDocument, TSurveyModel>('Survey', schema, 'surveys');