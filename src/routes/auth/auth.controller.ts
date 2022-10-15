import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model"
import bcrypt from "bcrypt"
import { UserRoles } from "../../types/user.types";
import Utils from "../../utils/utils";
import { ErrorWithStatus } from "../../errors/errorWithStatus";

export default class AuthController {

    static async registerStudent(req: Request, res: Response, next: NextFunction) {
        try {
            //try to find the user
            const user = await User.findOne({ email: req.body.email });
            if (user) { return next(new ErrorWithStatus("User already exists", 400)) }

            //construct user
            const userToInsert = {
                ...req.body,
                password: await bcrypt.hash(req.body.password, 10),
                role: UserRoles.Student
            }

            await User.create(userToInsert);
            res.status(201).send();

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
}