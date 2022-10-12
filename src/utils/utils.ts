import { TUser } from "../types/user.types";
import jwt from "jsonwebtoken";
import { TJWTPayload } from "../types/auth.types";

export default class Utils {
    static generateToken(user: TUser) {
            const expiresIn = 60 * 60 * 4;
            const secret = <string>process.env.JWT_SECRET;
            const dataStoredInToken: TJWTPayload = {
                _id: user._id
            };
            return {
                expiresIn,
                token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
            };
    }
}