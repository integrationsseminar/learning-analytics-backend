import { NextFunction, Request, Response } from "express";
import { LearningAnalyticsError } from "../types/errors";

export default function (err: LearningAnalyticsError, _req: Request, res: Response, next: NextFunction) {
    console.error(err.msg)
    if (err) {
        res.status(err.statusCode).json({statusCode: err.statusCode, msg: err.msg || "Something went wrong"})
    }
    next();
}