import { NextFunction, Request, Response } from "express";
import { PipelineStage } from "mongoose";
import Notification from "../../models/notification.model";
import { TNotification, TNotificationDocument, TNotificationModel } from "../../types/notification.types";
import BaseCRUDController,{ CRUDControllerOptions } from "../../utils/CRUDController";


const CRUDOpts: CRUDControllerOptions<TNotification, TNotificationDocument> = {
    routeConfigs: {
        getAllBaseQuery: async (req: Request)=> {
            return [{
                $match: {
                    user: req.user._id
                }
            }, {
                $sort: {
                    createdAt: -1
                }
            }] as PipelineStage[]
        },
        getAllPostProc: async (req: Request, data: any[]) => {
            await Notification.updateMany(
                { user: req.user._id },
                { $set: { read : true } },
                {new: true}
             )
             return data;
        }
    }
}

export default class CourseController extends BaseCRUDController<TNotification, TNotificationDocument, TNotificationModel>(Notification, CRUDOpts) { }


export class NotificationControllerOld {
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