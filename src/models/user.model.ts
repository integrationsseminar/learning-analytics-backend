import { Schema, model } from 'mongoose';
import { UserRoles, TUserDocument, TUserModel } from "../types/user.types";


const schema = new Schema<TUserDocument>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true, select: false},
  role: {
    type: String,
    enum: [UserRoles.Student, UserRoles.Admin, UserRoles.Lecturer],
    immutable: true,
    required: true
  },
  profilePicture: {type: String, required: false}
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

export default model<TUserDocument, TUserModel>('User', schema, 'users');