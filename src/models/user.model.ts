import { Schema, model } from 'mongoose';
import { UserRoles, TUserDocument, TUserModel } from "../types/user.types";


const schema = new Schema<TUserDocument>({
  name: {type: String, required: true},
  email: {type: String, required: true, immutable: true},
  university: {type: String, required: false},
  courseOfStudy: {type: String, required: false},
  semester: {type: String, required: false},
  industry: {type: String, required: false},
  password: {type: String, required: true, select: false},
  role: {
    type: String,
    enum: [UserRoles.Student, UserRoles.Admin, UserRoles.Lecturer],
    immutable: true,
    required: true
  },
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

  schema.index({
    email: 1, 
  },
  {
    unique: true,
    partialFilterExpression: {
      deleted: {
        $ne: true
      }
    }
  })

export default model<TUserDocument, TUserModel>('User', schema, 'users');