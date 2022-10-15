import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { TJWTPayload } from "../types/auth.types";
import { TUserDocument, UserRoles } from "../types/user.types";
import { ErrorWithStatus } from "../errors/errorWithStatus";
import User from '../models/user.model';

export default function authMiddleware(allowedRoles: UserRoles[]) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const bearer = req.headers.authorization as string;

            if (!bearer || !bearer.startsWith("Bearer ")) {
                return next(new ErrorWithStatus("Wrong Bearer format", 400));
            }

            const jwtString = bearer.substring("Bearer ".length);

            await jwt.verify(jwtString, process.env.JWT_SECRET as string);
            const user = jwt.decode(jwtString) as TJWTPayload

            if (!allowedRoles.includes(user.role)) {
                return next(new ErrorWithStatus("You shall not pass", 401))
            }
            req.user = await User.findById(user._id) as TUserDocument;
            next();

        } catch (e) {
            return next(new ErrorWithStatus("You shall not pass", 401))
        }
    }
}