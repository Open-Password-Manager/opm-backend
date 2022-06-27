import {Schema, model, Model, Types, Document} from 'mongoose'
import {generatePassword} from "../Utils/Shared";
import {CONFIGURATION} from "../config";
import {Category, categorySchema, ICategory} from "./Category";


interface IUser extends Document{
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
        //@ts-ignore
    categories: [categorySchema]
}

interface IUserModel extends Model<IUser>{
    findByEmail(name: string): Promise<IUser>
}

const userSchema = new Schema<IUser, IUserModel>({
    displayName: { type: String, required: true},
    emailAddress: { type: String, required: true, unique: true},
    phoneNumber: { type: String, required: false},
    password: { type: String, required: true, default: generatePassword(CONFIGURATION.USER.PASSWORD_MIN_LENGTH)},
    updatedAt: { type: Date, required: true, default: Date.now()},
    createdAt: { type: Date, required: true, default: Date.now()},
    enabled: { type: Boolean, required: true, default: true},
    picture: { type: String, required: false, default: null},
    // @ts-ignore
    categories: { type: [categorySchema], required: true, default: []}
});



//#region Custom statics

/**
 * Fetches user by email address
 *
 * @param name E-Mail address of user to be fetched
 * @returns User object
 */
async function findByEmail(address: string) {
    return User.findOne({emailAddress: new RegExp(address, 'i')});
}
userSchema.static('findByEmail', findByEmail);



//#endregion



export const User = model<IUser, IUserModel>('User', userSchema);

