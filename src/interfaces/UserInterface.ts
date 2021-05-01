import { Document } from "mongoose";

export interface IUserInterface extends Document {
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}