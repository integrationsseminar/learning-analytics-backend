import { NextFunction, Request, Response } from "express";
import Notification from "../../models/notification.model";

export default class NotificationController {
    static async getNotificationsForLoggedInUser(req: Request, res: Response, next: NextFunction){
        try {
            const notifications = await Notification.find({_id: req.user._id}, null, {sort: {createdAt:1}})
            await Notification.updateMany(
               { _id: req.user._id },
               { $set: { read : true } },
               {new: true}
            )
            res.json({count:notifications.length, data: notifications})
         } catch (e) {
            next(e)
         }
    }
}