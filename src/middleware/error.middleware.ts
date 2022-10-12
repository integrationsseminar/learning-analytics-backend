import { NextFunction, Request, Response } from "express";

export default function (err: any, _req: Request, res: Response, next: NextFunction) {
    console.error(err)
    res.json(err || new Error("Something went wrong"))
    next();
}