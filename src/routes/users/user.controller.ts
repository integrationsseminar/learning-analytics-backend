import { NextFunction, Request, Response } from 'express';
import User from '../../models/user.model'
import {getQueryFromUrl} from "odatafy-mongodb"
import { PipelineStage } from 'mongoose';
import { TRequestWithUser } from '../../types/auth.types';

export default class UserController {

    static async getUserOdatafy(req: Request, res: Response, next: NextFunction) {
        try {
            const query = getQueryFromUrl(req.url) as PipelineStage[];
            const result = await User.aggregate(query)
            res.json({
                data: result,
                count: result.length
            });
        } catch (e) { 
            res.status(500)
            return next(e) 
        }
    }

    static async getLoggedInUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findById((<TRequestWithUser>req).user._id)
            return res.json(user);
        } catch (e) { 
            res.status(500)
            return next(e) 
        }
    }

    static async deleteUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOneAndDelete({id: req.params.id}, {});
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
            const user = await User.findOneAndUpdate({_id: (<TRequestWithUser>req).user._id}, req.body, { new: true });
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