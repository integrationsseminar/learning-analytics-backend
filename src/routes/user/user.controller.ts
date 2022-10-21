import { NextFunction, Request, Response } from 'express';
import User from '../../models/user.model'
import {getQueryFromUrl} from "odatafy-mongodb"
import { PipelineStage } from 'mongoose';
import { ErrorWithStatus } from '../../errors/errorWithStatus';

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
            return next(e) 
        }
    }

    static async getLoggedInUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findById(req.user._id)
            return res.json(user);
        } catch (e) { 
            return next(e) 
        }
    }

    static async deleteUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOneAndDelete({id: req.params.id}, {});
            if (!user) { 
                return next(new ErrorWithStatus("User not found", 404));
            }
            return res.status(204).send();
        } catch (e) { 
            return next(e);
        }
    }

    static async updateUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOneAndUpdate({_id: req.user._id}, req.body, { new: true });
            if (!user) { 
                return next(new ErrorWithStatus("User not found", 404));
            }
            return res.json(user);
        } catch (e) { 
            return next(e);
        }
    }
}