import {Schema, model, Model, Types, Document, ClientSession} from 'mongoose'
import {generatePassword} from "../Utils/Shared";
import {CONFIGURATION} from "../config";
import {Category, categorySchema, ICategory} from "./Category";
import * as argon2 from "argon2";
import * as mongoose from "mongoose";

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
    /** Users own categories */
    categories: [mongoose.Schema.Types.ObjectId]
}

interface IUserModel extends Model<IUser>{
    /** Fetches user by its email address */
    findByEmail(session: ClientSession, name: string): Promise<IUser>,
    createIt(session: ClientSession, displayName: string, emailAddress: string, password: string, phoneNumber: string, profilePicture?: string): Promise<IUser>
    addNewCategory(session: ClientSession, userId: mongoose.Schema.Types.ObjectId, name: String): Promise<ICategory>
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
    categories: { type: [mongoose.Schema.Types.ObjectId], ref: 'Category', required: true, default: []}
});



//#region Custom statics

/**
 * Fetches user by email address
 * @param session Associated session
 * @param name E-Mail address of user to be fetched
 * @returns User object
 */
async function findByEmail(session: ClientSession, address: string) {
    return User.findOne({emailAddress: new RegExp(address, 'i')}).session(session);
}
userSchema.static('findByEmail', findByEmail);


/**
 * Creates a new user
 * @param session Associated session
 * @param displayName
 * @param emailAddress
 * @param password
 * @param phoneNumber
 * @param profilePicture
*/
async function createIt(session: ClientSession, displayName: string, emailAddress: string, password: string, phoneNumber: string, profilePicture?: string){
    try{
        const hashedPassword = await argon2.hash(password);
        const newUser = await User.create([{
            displayName,
            emailAddress,
            phoneNumber,
            password
        }], {session})
        return newUser[0]
    }catch(err: unknown){
        console.log(err);
        throw new Error("Failed to create new user!")
    }


}
userSchema.static('createIt', createIt);

async function addNewCategory(session: ClientSession, userId: mongoose.Schema.Types.ObjectId, name: string){
    try{

        const newCategory = await Category.create([{
            name
        }], {session});

        const newCat = newCategory[0]

        console.time("Update")
        const explain = await User.findOneAndUpdate(
            {_id: userId},
            {$push:{categories: newCat._id}},
            {session: session}
        )
        console.timeEnd("Update")

        return newCat;

    }catch(err: unknown){
        console.log(err);
        throw new Error("Failed to create new user!")
    }
}
userSchema.static('addNewCategory', addNewCategory);

//#endregion



export const User = model<IUser, IUserModel>('User', userSchema);

