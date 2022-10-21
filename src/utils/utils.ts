import { TUserDocument } from "../types/user.types";
import jwt from "jsonwebtoken";
import { TJWTPayload } from "../types/auth.types";
import Notification from "../models/notification.model";
import { TNotification } from "../types/notification.types";

export default class Utils {
    static generateToken(user: TUserDocument) {
        const expiresIn = 60 * 60 * 4;
        const secret = <string>process.env.JWT_SECRET;
        const dataStoredInToken: TJWTPayload = {
            _id: user._id,
            role: user.role
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }

    static async createNotification(userIds: string[], title: string, message: string) {

        //future: check here for notification settings
        let notifications: TNotification[] = [];
        for (let i = 0; i < userIds.length; i++) {
            notifications.push({
                user: userIds[i],
                title: title,
                message: message,
                read: false
            })
        }
        await Notification.create(notifications)
    }
}