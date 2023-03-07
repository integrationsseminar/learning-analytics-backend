import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ErrorWithStatus } from "../errors/errorWithStatus";

export default function (err: ErrorWithStatus, _req: Request, res: Response, next: NextFunction) {
    if(err instanceof mongoose.Error.ValidationError) err.status = 400
    console.log("Error", err.message || err.toString())
    res.status(err.status || 500).json({err: err.message || err.toString()})
    next();
}