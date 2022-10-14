import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model"
import bcrypt from "bcrypt"
import { UserRoles } from "../../types/user.types";
import Utils from "../../utils/utils";
import { Error } from "mongoose";

export default class AuthController {

    static async registerStudent(req: Request, res: Response, next: NextFunction) {
        try {
            //try to find the user
            const user = await User.findOne({ email: req.body.email });
            if (user) { return res.status(400).json({ err: "User already exists" }); }

            //construct user
            const userToInsert = {
                ...req.body,
                password: await bcrypt.hash(req.body.password, 10),
                role: UserRoles.Student
            }

            await User.create(userToInsert);
            res.status(201).send();

        } catch (e) {
            if((<Error.ValidationError>e).errors.name.name) {
                res.status(400)
            } else {
                res.status(500)
            }
            return next(e)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({ email: req.body.email }, "+password")
            if (!user) { return res.status(400).json({ err: "User not found" }); }
            if (!await bcrypt.compare(req.body.password, user.password)) {
                res.status(401)
                return next(new Error("Email / Password combination not recognized"))
            }
            return res.json({
                email: user.email,
                token: Utils.generateToken(user)
            });
        } catch (e) {
            res.status(500)
            return next(e)
        }
    }
}