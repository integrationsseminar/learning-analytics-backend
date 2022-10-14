import { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "../errors/errorWithStatus";

export default function (err: ErrorWithStatus, _req: Request, res: Response, next: NextFunction) {
    console.log("Error", err.message || err.toString())
    res.status(err.status || 500).json({err: err.message || err.toString()})
    next();
}