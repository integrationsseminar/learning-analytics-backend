
import { TThreadComment, TThreadCommentDocument, TThreadCommentModel } from '../../types/threadcomment.types';
import ThreadComment from '../../models/threadcomment.model';

import BaseCRUDController, { CRUDControllerOptions } from '../../utils/CRUDController';
import { PipelineStage } from 'mongoose';
import { TCourseDocument } from '../../types/course.types';
import { TRequestWithUser } from '../../types/auth.types';
import { UserRoles } from '../../types/user.types';

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
            const { _id: userId, role } = (<TRequestWithUser>req).user

            //only keep threads that the requesting user has access to (owner / member)
            if (role == UserRoles.Lecturer || role == UserRoles.Student) {
                threadComments = threadComments.filter((threadComment) => {
                    const course = (<TThreadCommentDocument & { thread: TThreadComment & { course: TCourseDocument } }>threadComment).thread.course
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
            const { _id: userId, role } = (<TRequestWithUser>req).user

            //only keep threads that the requesting user has access to (owner / member)
            if (role == UserRoles.Lecturer || role == UserRoles.Student) {
                threadComments = threadComments.filter((threadComment) => {
                    const course = (<TThreadCommentDocument & { thread: TThreadComment & { course: TCourseDocument } }>threadComment).thread.course
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
            const { _id: userId, role } = (<TRequestWithUser>req).user

            //only keep threads that the requesting user has access to (owner / member)
            if (role == UserRoles.Lecturer) {
                threadComments = threadComments.filter((threadComment) => {
                    const course = (<TThreadCommentDocument & { thread: TThreadComment & { course: TCourseDocument } }>threadComment).thread.course
                    return course.owner == userId
                })
            }

            //extract the threadIds
            let threadIds = threadComments.map((thread) => {
                return thread._id
            })

            return [{ $match: { _id: { $in: threadIds } } }] as PipelineStage[]
        },

        createBaseBody: async (req) => {
            return {
                createdBy: (<TRequestWithUser>req).user._id
            }
        },

    },
    softDelete: true
}

export default class CourseController extends BaseCRUDController<TThreadComment, TThreadCommentDocument, TThreadCommentModel>(ThreadComment, CRUDOpts) { }