import { Schema, model } from 'mongoose';
import { ProgressTypes, TCourseDocument, TCourseModel } from "../types/course.types";


const schema = new Schema<TCourseDocument>({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [ { type: Schema.Types.ObjectId, ref: 'User', required: true } ],
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    color: { type: String, required: true },
    progressType: { type: String, enum: Object.values(ProgressTypes), default: ProgressTypes.BYDATE },
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

export default model<TCourseDocument, TCourseModel>('Course', schema, 'courses');