import { Request } from "express";
import { PipelineStage } from "mongoose";
import LearningProgressEntry from "../../models/learningProgressEntry.model";
import { TLearningProgressEntry, TLearningProgressEntryDocument, TLearningProgressEntryModel } from "../../types/learningProgressEntry.types";
import BaseCRUDController, { CRUDControllerOptions } from "../../utils/CRUDController";


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
        }
    }
}

export default class LearningProgressEntryController extends BaseCRUDController<TLearningProgressEntry, TLearningProgressEntryDocument, TLearningProgressEntryModel>(LearningProgressEntry, CRUDOpts) { }