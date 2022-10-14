import { NextFunction, Request, Response } from 'express';
import User from '../../models/user.model'
import {getQueryFromUrl} from "odatafy-mongodb"
import { PipelineStage } from 'mongoose';

export default class UserController {

    static async getUserOdatafy(req: Request, res: Response, next: NextFunction) {
        try {
            const query = getQueryFromUrl(req.url) as PipelineStage[];
            let result = await User.aggregate(query)
            res.json({
                data: result,
                count: result.length
            });
        } catch (e) { 
            res.status(500)
            return next(e) 
        }
    };

    static async getLoggedInUser(_req: Request, _res: Response, _next: NextFunction) {

    }
    //TODO my not supported yet
    static async deleteUserById(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await User.findOneAndDelete({id: req.params.id}, {});
            if (!user) { 
                res.status(400);
                return next(new Error("User not found"));
            }
            return res.status(204).send();
        } catch (e) { 
            res.status(500);
            return next(e);
        }
    }

    static async updateUserById(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await User.findOneAndUpdate({}, req.body, { new: true });
            if (!user) { 
                res.status(400);
                return next(new Error("User not found"));
            }
            return res.json(user);
        } catch (e) { 
            res.status(500)
            return next(e);
        }
    }
}