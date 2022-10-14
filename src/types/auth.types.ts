import { Request } from "express"
import { Schema } from "mongoose"
import { UserRoles } from "./user.types"

export type TJWTPayload = {
    _id: Schema.Types.ObjectId,
    role: UserRoles
}

export type TRequestWithUser = Request & {
    user: TJWTPayload
}