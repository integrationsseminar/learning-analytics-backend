import { Schema, Document, Model } from "mongoose"

export type TUser = {
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

export interface TUserDocument extends TUser, Document {};

export interface TUserModel extends Model<TUserDocument>{};