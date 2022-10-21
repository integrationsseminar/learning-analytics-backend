import { TUserDocument } from "../types/user.types";
import jwt from "jsonwebtoken";
import { TJWTPayload } from "../types/auth.types";
import Notification from "../models/notification.model";

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

    static async createNotification(userId: string, title: string, message: string) {

        //future: check here for notification settings
        await Notification.create({
            user: userId, 
            title: title, 
            message: message,
            read: false
        })
    }
}