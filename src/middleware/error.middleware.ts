import { NextFunction, Request, Response } from "express";

export default function (err: Error, _req: Request, res: Response, next: NextFunction) {
    console.error(err.toString())
    res.json(err.toString() || new Error("Something went wrong"))
    next();
}