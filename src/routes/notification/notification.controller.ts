import { Request } from "express";
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