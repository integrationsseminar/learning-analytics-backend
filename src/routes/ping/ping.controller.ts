import { Request, Response, NextFunction } from "express";
export default class PingController {
    static async ping(_req: Request , res:Response, _next:NextFunction) {
        res.json({msg: "pong"})
    }
}