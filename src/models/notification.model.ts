import { Schema, model } from 'mongoose';
import { TNotificationDocument, TNotificationModel } from '../types/notification.types';


const schema = new Schema<TNotificationDocument>({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true},
    title: {type: String, required: true},
    message: {type: String, required: true},
    read: {type: Boolean, required: true, default: false}
},
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    },
    timestamps: { createdAt: 'createdAt' , updatedAt: 'updatedAt'}
  });

export default model<TNotificationDocument, TNotificationModel>('Notification', schema, 'notifications');