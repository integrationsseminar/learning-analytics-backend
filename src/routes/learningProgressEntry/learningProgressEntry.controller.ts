import { Request } from "express";
import { PipelineStage } from "mongoose";
import LearningProgressEntry from "../../models/learningProgressEntry.model";
import { TLearningProgressEntry, TLearningProgressEntryDocument, TLearningProgressEntryModel } from "../../types/learningProgressEntry.types";
import BaseCRUDController, { CRUDControllerOptions } from "../../utils/CRUDController";
import Utils from "../../utils/utils";


const CRUDOpts: CRUDControllerOptions<TLearningProgressEntry, TLearningProgressEntryDocument> = {
    routeConfigs: {
        getAllBaseQuery: async (req: Request) => {
            return [{
                $match: {
                    user: req.user._id
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }] as PipelineStage[]
        },
        createBaseBody: async (req: Request) => {
            return {
                user: req.user._id
            }
        },
        createPostProc: async(_req, data) => {
            //remove other entries from the same day
            await LearningProgressEntry.deleteMany({createdAt: {$gt: Utils.roundDateToLastMidnight(data.createdAt)}, _id: {$ne: data._id}})
            return data
        },
    }
}

export default class LearningProgressEntryController extends BaseCRUDController<TLearningProgressEntry, TLearningProgressEntryDocument, TLearningProgressEntryModel>(LearningProgressEntry, CRUDOpts) { }