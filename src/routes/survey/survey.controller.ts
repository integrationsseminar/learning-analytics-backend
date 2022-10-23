import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Ajv from 'ajv'; 

import { TSurvey, TSurveyDocument, TSurveyModel } from '../../types/survey.types';
import { ErrorWithStatus } from '../../errors/errorWithStatus';
import Survey from '../../models/survey.model';

import { UserRoles } from '../../types/user.types';

import BaseCRUDController, { CRUDControllerOptions } from '../../utils/CRUDController';

const CRUDOpts: CRUDControllerOptions<TSurvey, TSurveyDocument> = {
    routeConfigs: {
        getAllBaseQuery: async (req) => {
            if(req.user.role == UserRoles.Lecturer || req.user.role == UserRoles.Student) {
                return [
                    {
                        $match: {
                            $or: [
                                { users: new mongoose.Types.ObjectId(req.user._id) },
                                { createdBy: new mongoose.Types.ObjectId(req.user._id) }
                            ]
                        }
                    }
                ]
            }

            return []
        },
        getByIdBaseQuery: async (req) => {
            if(req.user.role == UserRoles.Lecturer || req.user.role == UserRoles.Student) {
                return [
                    {
                        $match: {
                            $or: [
                                { users: new mongoose.Types.ObjectId(req.user._id) },
                                { createdBy: new mongoose.Types.ObjectId(req.user._id) }
                            ]
                        }
                    }
                ]
            }

            return []
        },
        updateBaseBody: async (req) => {
            if(req.user.role == UserRoles.Lecturer) {
                return {
                    createdBy: req.user._id
                }
            }

            return {}
        },
        updateBaseQuery: async (req) => {
            if(req.user.role == UserRoles.Lecturer) {
                return [
                    {
                        $match: {
                            createdBy: new mongoose.Types.ObjectId(req.user._id)
                        }
                    }
                ]
            }

            return []
        },
        deleteBaseQuery: async (req) => {
            if(req.user.role == UserRoles.Lecturer || req.user.role == UserRoles.Student) {
                return [
                    {
                        $match: {
                            createdBy: new mongoose.Types.ObjectId(req.user._id)
                        }
                    }
                ]
            }

            return []
        },
        createBaseBody: async (req) => {
            if(req.user.role == UserRoles.Lecturer) {
                return {
                    createdBy: req.user._id
                }
            }

            return {}
        }
    },
    softDelete: true
}

export default class SurveyController extends BaseCRUDController<TSurvey, TSurveyDocument, TSurveyModel>(Survey, CRUDOpts) {
    public static async submitSurveyAnswer(req: Request, res: Response, next: NextFunction) {
        const survey = await Survey.findOne({ _id: req.params.id, deleted: { $ne: true }, answers: { $not: { $elemMatch: { user: req.user._id } } } });

        if(!survey) {
            return next(new ErrorWithStatus(`No unanswered survey with id: ${req.params.id}`, 400))
        }

        const ajv = new Ajv();
        const validate = ajv.compile(survey.answerType);
        if(!validate(req.body.answer)) {
            return next(new ErrorWithStatus(`Validation failed ${JSON.stringify(validate.errors)}`));
        }

        await Survey.findOneAndUpdate(
            { _id: req.params.id }, 
            { $addToSet: { answers: { user: req.user._id, answer: req.body.answer } } }, 
            { new: true }
        );

        res.status(204).json();
    }
}