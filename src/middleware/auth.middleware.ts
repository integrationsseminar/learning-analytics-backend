import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { TJWTPayload, TRequestWithUser } from "../types/auth.types";
import { UserRoles } from "../types/user.types";

export default function authMiddleware(allowedRoles: UserRoles[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bearer = req.headers.authorization as string;

            if (!bearer || !bearer.startsWith("Bearer ")) {
                res.status(400)
                return next(new Error("Wrong Bearer format"));
            }

            const jwtString = bearer.substring("Bearer ".length);

            await jwt.verify(jwtString, process.env.JWT_SECRET as string);
            const user = jwt.decode(jwtString) as TJWTPayload

            if (!allowedRoles.includes(user.role)) {
                res.status(401);
                return next(new Error("You shall not pass"))
            }
            (<TRequestWithUser>req).user = user;
            next();

        } catch (e) {
            res.status(401)
            return next(new Error("You shall not pass"))
        }
    }
}