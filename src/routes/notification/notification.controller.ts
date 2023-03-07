import { Request } from "express";
import { PipelineStage } from "mongoose";
import Notification from "../../models/notification.model";
import { TNotification, TNotificationDocument, TNotificationModel } from "../../types/notification.types";
import BaseCRUDController,{ CRUDControllerOptions } from "../../utils/CRUDController";

import UserTrophy from "../../models/usertrophy.model";
import { TrophyIdents, TrophyTiers } from "../../types/usertrophy.types";

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
                { new: true }
            )

            if((await Notification.count({ read : true, user: req.user._id }))) {
                await UserTrophy.findOneAndUpdate(
                    { trophy: TrophyIdents.ReadNotification, user: req.user._id },
                    { tier: TrophyTiers.BRONZE },
                    { upsert: true }
                )
            }

            return data;
        }
    }
}

export default class CourseController extends BaseCRUDController<TNotification, TNotificationDocument, TNotificationModel>(Notification, CRUDOpts) { }