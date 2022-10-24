
import { TThread, TThreadDocument, TThreadModel } from '../../types/thread.types';
import Thread from '../../models/thread.model';

import BaseCRUDController, { CRUDControllerOptions } from '../../utils/CRUDController';
import { PipelineStage } from 'mongoose';
import { UserRoles } from '../../types/user.types';

const CRUDOpts: CRUDControllerOptions<TThread, TThreadDocument> = {

    routeConfigs: {
        getAllBaseQuery: async (req) => {
            let threads = await Thread.find({}).populate('course', 'members owner').select('course _id')
            const { _id: userId, role } = req.user

            //only keep threads that the requesting user has access to (owner / member)
            if (role == UserRoles.Lecturer || role == UserRoles.Student) {
                threads = threads.filter((thread) => {
                    return thread.course.members.includes(userId)
                        || thread.course.owner == userId
                });
            }

            //extract the threadIds
            let threadIds = threads.map((thread) => {
                return thread._id
            })
            return [{ $match: { _id: { $in: threadIds } } }] as PipelineStage[]
        },

        getByIdBaseQuery: async (req) => {
            let threads = await Thread.find({}).populate('course', 'members owner').select('course _id')
            const { _id: userId, role } = req.user

            //only keep threads that the requesting user has access to (owner / member)
            if (role == UserRoles.Lecturer || role == UserRoles.Student) {
                threads = threads.filter((thread) => {
                    return thread.course.members.includes(userId) || thread.course.owner == userId
                })
            }

            //extract the threadIds
            let threadIds = threads.map((thread) => {
                return thread._id
            })
            return { $and: [{ _id: { $in: threadIds } }, { _id: req.params.id }] }
        },

        updateBaseQuery: async (req) => {
            const { _id: userId, role } = req.user

            let threads = await Thread.find({}).populate('course', 'members owner')

            //Students can change their own threads
            if (role == UserRoles.Student) {
                threads = threads.filter((thread) => {
                    return thread.createdBy == userId
                })
            }

            //Lecturers can change every thread in their own course
            if (role == UserRoles.Lecturer) {
                threads = threads.filter((thread) => {
                    return thread.course.members.includes(userId) || thread.course.owner == userId
                })
            }

            //extract the threadIds
            let threadIds = threads.map((thread) => {
                return thread._id
            })
            return { $and: [{ _id: { $in: threadIds } }, { _id: req.params.id }] }
        },

        deleteBaseQuery: async (req) => {
            let threads = await Thread.find({}).populate('course', 'members owner').select('course _id')
            const { _id: userId } = req.user

            //lecturers can only delete threads from their own courses
            if (req.user.role == UserRoles.Lecturer) {
                threads = threads.filter((thread) => {
                    return thread.course.owner == userId
                })
            }

            //extract the threadIds
            let threadIds = threads.map((thread) => {
                return thread._id
            })
            return { $and: [{ _id: { $in: threadIds } }, { _id: req.params.id }] }
        },
        //hinzufügen, dass man nur Threads zu seinen eigenen Kursen adden kann
        createBaseBody: async (req) => {
            return {
                createdBy: req.user._id
            }
        },

    },
    softDelete: true
}

export default class CourseController extends BaseCRUDController<TThread, TThreadDocument, TThreadModel>(Thread, CRUDOpts) { }