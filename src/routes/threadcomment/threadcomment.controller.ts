
import { TThreadComment, TThreadCommentDocument, TThreadCommentModel } from '../../types/threadcomment.types';
import ThreadComment from '../../models/threadcomment.model';

import BaseCRUDController, { CRUDControllerOptions } from '../../utils/CRUDController';
import {  PipelineStage } from 'mongoose';
import { UserRoles } from '../../types/user.types';
import Utils from '../../utils/utils';
import { HTTPBadRequestError, HTTPInternalServerError } from '../../errors/errorWithStatus';
import Thread from '../../models/thread.model';

const CRUDOpts: CRUDControllerOptions<TThreadComment, TThreadCommentDocument> = {

    routeConfigs: {
        getAllBaseQuery: async (req) => {
            let threadComments = await ThreadComment.find({}).populate({
                path: 'thread',
                populate: {
                    path: 'course',
                    model: 'Course'
                }
            })
            const { _id, role } = req.user
            const userId = _id.toString()

            //only keep threads that the requesting user has access to (owner / member)
            if (role == UserRoles.Lecturer || role == UserRoles.Student) {
                threadComments = threadComments.filter((threadComment) => {
                    const course = threadComment.thread.course
                    return course.members.includes(userId) || course.owner == userId
                })
            }
            //extract the threadIds
            let threadIds = threadComments.map((thread) => {
                return thread._id
            })
            return [{ $match: { _id: { $in: threadIds } } }] as PipelineStage[]
        },

        getByIdBaseQuery: async (req) => {
            let threadComments = await ThreadComment.find({}).populate({
                path: 'thread',
                populate: {
                    path: 'course',
                    model: 'Course'
                }
            })
            const { _id, role } = req.user
            const userId = _id.toString()

            //only keep threads that the requesting user has access to (owner / member)
            if (role == UserRoles.Lecturer || role == UserRoles.Student) {
                threadComments = threadComments.filter((threadComment) => {
                    const course = threadComment.thread.course
                    return course.members.includes(userId) || course.owner == userId
                })
            }

            //extract the threadIds
            let threadIds = threadComments.map((thread) => {
                return thread._id
            })
            return [{ $match: { _id: { $in: threadIds } } }] as PipelineStage[]
        },

        deleteBaseQuery: async (req) => {
            let threadComments = await ThreadComment.find({}).populate({
                path: 'thread',
                populate: {
                    path: 'course',
                    model: 'Course'
                }
            })
            const { _id, role } = req.user
            const userId = _id.toString()

            //only keep threads that the requesting user has access to (owner)
            if (role == UserRoles.Lecturer) {
                threadComments = threadComments.filter((threadComment) => {
                    const course = threadComment.thread.course
                    return course.owner == userId
                })
            }

            //extract the threadIds
            let threadIds = threadComments.map((thread) => {
                return thread._id
            })

            return [{ $match: { _id: { $in: threadIds } } }] as PipelineStage[]
        },

        //hinzufügen, dass man nur Kommentare in Threads erstellen kann, zu denen man access hat
        createBaseBody: async (req) => {
            const thread = await Thread.findOne({_id: req.body.thread}).populate('course')

        if(!thread) throw new HTTPBadRequestError("Thread not found")
            return {
                createdBy: req.user._id,
                createdByOwner: req.user._id.equals(thread.course.owner)
            }
        },

        createPostProc: async (_req, data) => {
            let threadComment = await ThreadComment.findOne({_id: data._id}).populate({
                path: 'thread',
                populate: {
                    path: 'course',
                    model: 'Course'
                }
            })
            if(!threadComment) {
                throw new HTTPInternalServerError("Error in createPostProc of threadcomment controller")
            }
            await Utils.createNotification([...threadComment.thread.course.members, threadComment.thread.course.owner], `Neuer Kommentar auf einen Thread`, "Es wurde ein neuer Kommentar im Thread mem lal lol erstellt. Bitte einloggen")
            return data
        },

    },
    softDelete: true
}

export default class CourseController extends BaseCRUDController<TThreadComment, TThreadCommentDocument, TThreadCommentModel>(ThreadComment, CRUDOpts) { }