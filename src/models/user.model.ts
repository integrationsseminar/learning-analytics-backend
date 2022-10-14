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
  profilePicture: {type: String, required: false},
  courses: [{type: Schema.Types.ObjectId}]
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


//add textIndex for full text search
/*
schema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text'
})
*/

export default model<TUserDocument, TUserModel>('User', schema, 'users');