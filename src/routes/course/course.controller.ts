import { Request } from 'express';
import { PipelineStage, Types } from 'mongoose';

import { UserRoles } from '../../types/user.types';

import { TCourse, TCourseDocument, TCourseModel } from '../../types/course.types';
import Course from '../../models/course.model';

import BaseCRUDController, { CRUDControllerOptions } from '../../utils/CRUDController';

const CRUDOpts: CRUDControllerOptions<TCourse, TCourseDocument> = {
    softDelete: true,
    routeConfigs: {
        getAllBaseQuery: async (req: Request) => {
            const result: PipelineStage[] = []

            if(req.user.role == UserRoles.Lecturer) {
                result.push({
                    $match: {
                        $or: [
                            { owner: new Types.ObjectId(req.user._id) },
                            { members: new Types.ObjectId(req.user._id) }
                        ]
                        
                    }
                });
            }

            if(req.user.role == UserRoles.Student) {
                result.push({
                    $match: {
                        members: new Types.ObjectId(req.user._id)
                    }
                });
            }

            return result;
        },
        getByIdBaseQuery: async (req: Request) => {
            if(req.user.role == UserRoles.Lecturer) {
                return {
                        $or: [
                            { owner: new Types.ObjectId(req.user._id) },
                            { members: new Types.ObjectId(req.user._id) }
                        ]   
                    }
            }

            if(req.user.role == UserRoles.Student) {
                return {
                        members: new Types.ObjectId(req.user._id)
                    }
            }

            return {}
        },
        createBaseBody: async (req: Request) => {
            if (req.user.role == UserRoles.Lecturer) {
                return {
                    owner: req.user._id
                }
            }
            
            return {}
        },
        updateBaseQuery: async (req: Request) => {
            if (req.user.role == UserRoles.Lecturer) {
                return {
                    owner: req.user._id
                }
            }
            
            return {}
        },
        updateBaseBody: async (req: Request) => {
            if (req.user.role == UserRoles.Lecturer) {
                return {
                    owner: req.user._id
                }
            }
            
            return {}
        },
        deleteBaseQuery: async (req: Request) => {
            if (req.user.role == UserRoles.Lecturer) {
                return {
                    owner: req.user._id
                }
            }
            
            return {}
        }
    }
}

export default class CourseController extends BaseCRUDController<TCourse, TCourseDocument, TCourseModel>(Course, CRUDOpts) { }