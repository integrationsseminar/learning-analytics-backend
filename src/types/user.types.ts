import { Document, Model } from "mongoose"

export type TUser = {
    name: string,
    email: string,
    password: string,
    role: UserRoles, 
    university: string,   
    courseOfStudy: string, //Studiengang
    semester: number //Semesternummer
    industry: string //Branche
}

export enum UserRoles {
    Student = "Student",
    Lecturer = "Lecturer",
    Admin = "Admin"
}

export interface TUserDocument extends TUser, Document {};

export interface TUserModel extends Model<TUserDocument> {};