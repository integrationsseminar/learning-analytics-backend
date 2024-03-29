import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model"
import bcrypt from "bcrypt"
import { UserRoles } from "../../types/user.types";
import Utils from "../../utils/utils";
import { ErrorWithStatus } from "../../errors/errorWithStatus";
import Course from "../../models/course.model";
import Survey from "../../models/survey.model";

export default class AuthController {

    static async registerStudent(req: Request, res: Response, next: NextFunction) {
        try {
            //construct user
            const userToInsert = {
                ...req.body,
                password: await bcrypt.hash(req.body.password, 10),
                role: UserRoles.Student
            }
            
            let course = await Course.findById(req.params.id)
            if(!course) {
                return next(new ErrorWithStatus("Course unknown", 400))
            }
            const newUser = await User.create(userToInsert);
            //add User to the course
            await Course.findOneAndUpdate({_id: req.params.id}, {$addToSet: {members: newUser._id}})
            //add User to all the surveys of the course
            console.log(await Survey.find({course: req.params.id}))
            await Survey.updateMany({course: req.params.id}, {$addToSet: {users: newUser._id}})
            return res.status(201).json(newUser);
        } catch (e) {
            return next(e)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({ email: req.body.email }, "+password")
            if (!user) { return next(new ErrorWithStatus("User not found", 404)) }
            if (!await bcrypt.compare(req.body.password, user.password)) {
                return next(new ErrorWithStatus("Email / Password combination not recognized", 401))
            }
            return res.json({
                email: user.email,
                token: Utils.generateToken(user)
            });
        } catch (e) {
            return next(e)
        }
    }

    static async loginWithCourseAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({ email: req.body.email }, "+password")
            if (!user) { return next(new ErrorWithStatus("User not found", 404)) }
            if (!await bcrypt.compare(req.body.password, user.password)) {
                return next(new ErrorWithStatus("Email / Password combination not recognized", 401))
            }
            let course = await Course.findById(req.params.id)

            if(!course) {
                return next(new ErrorWithStatus("Course unknown", 400))
            }
            //add User to the Course
            await Course.findOneAndUpdate({_id: req.params.id}, {$addToSet: {members: user._id}})
            //add User to all the surveys of the course
            await Survey.updateMany({course: req.params.id}, {$addToSet: {users: user._id}})
            return res.json({
                email: user.email,
                token: Utils.generateToken(user)
            });
        } catch (e) {
            return next(e)
        }
    }
}