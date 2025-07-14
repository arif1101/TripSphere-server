import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

export interface IAuthProvider{
    provider: string;
    providerId: string;
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
    name: string,
    email: string,
    password ?: string,
    role: Role,
    phone ?: string,
    picture ?: string,
    address ?: string,
    isDeleted ?: boolean,
    isActive ?: IsActive,
    isVerified ?: boolean,
    auths: IAuthProvider,
    bookings ?: Types.ObjectId[], // user get all bookings information
    guide ?: Types.ObjectId[], // user get all guide who guided
}