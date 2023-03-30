
import { TThread, TThreadDocument, TThreadModel } from '../../types/thread.types';
import Thread from '../../models/thread.model';

import BaseCRUDController, { CRUDControllerOptions } from '../../utils/CRUDController';
import { PipelineStage } from 'mongoose';
import { UserRoles } from '../../types/user.types';
import { TCourseDocument } from '../../types/course.types';
import { ErrorWithStatus } from '../../errors/errorWithStatus';

const CRUDOpts: CRUDControllerOptions<TThread, TThreadDocument> = {

    routeConfigs: {
        getAllBaseQuery: async (req) => {
            let threads = await Thread.find({}).populate('course', 'members owner').select('course _id')
            const { _id, role } = req.user
            const userId = _id.toString()

            //only keep threads that the requesting user has access to (owner / member)
            console.log(req.user._id)
            if (role == UserRoles.Lecturer || role == UserRoles.Student) {
                threads = threads.filter((thread) => {
                    return (thread.course.members.includes(userId) || thread.course.owner == userId)
                });
            }
            let threadIds = threads.map((thread) => {
                return thread._id
            })
            return [{ $match: { _id: { $in: threadIds } } }] as PipelineStage[]
        },

        getByIdBaseQuery: async (req) => {
            let threads = await Thread.find({}).populate('course', 'members owner').select('course _id')
            const { _id, role } = req.user
            const userId = _id.toString()

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
            const { _id, role } = req.user
            const userId = _id.toString()

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
            /*
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
            */

           //if the user is a lecturer, check if he is the owner of the course first
           if(req.user.role = UserRoles.Lecturer) {
                const thread = await Thread.findOne({_id: req.params.id}).populate<{course: TCourseDocument}>('course')
                if(!thread) throw new ErrorWithStatus("Thread not found", 404)
                console.log(thread.course.owner)
                console.log(req.user._id)
                if(!thread.course.owner.equals(req.user._id)) throw new ErrorWithStatus("You may only delete your threads from your own course", 403) 
           } 
           return [{}]
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