
import { Schema } from "mongoose"
export type TUser = {
    _id: Schema.Types.ObjectId
    name: string,
    email: string,
    password: string,
    role: UserRoles,    
    profilePicture?: string
    courses: Schema.Types.ObjectId[]

}

export enum UserRoles {
    Student = "Student",
    Lecturer = "Lecturer",
    Admin = "Admin"
}