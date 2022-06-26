import {Schema, model} from 'mongoose'
import {generatePassword} from "../Utils/Shared";
import {CONFIGURATION} from "../config";


interface IUser{
    /** Name of user to be displayed */
    displayName: string,
    /** Email address that identifies the user */
    emailAddress: string,
    /** Phone number (for 2FA) */
    phoneNumber: string,
    /** Hashed/salted password */
    password: string,
    /** Date of latest user data update */
    updatedAt: Date,
    /** Date of user creation */
    createdAt: Date,
    /** Whether user is allowed to login */
    enabled: boolean,
    /** Profile picture */
    picture: string,
    /** Users private categories */
    //TODO: Connect to Category schema
    categories:[]
}

const userSchema = new Schema<IUser>({
    displayName: { type: String, required: true},
    emailAddress: { type: String, required: true},
    phoneNumber: { type: String, required: false},
    password: { type: String, required: true, default: generatePassword(CONFIGURATION.USER.PASSWORD_MIN_LENGTH)},
    updatedAt: { type: Date, required: true, default: Date.now()},
    createdAt: { type: Date, required: true, default: Date.now()},
    enabled: { type: Boolean, required: true, default: true},
    picture: { type: String, required: false, default: null},
    categories: { type: [], required: true, default: []}
});

export const User = model<IUser>('User', userSchema);

