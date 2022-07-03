import {Schema, model, Model, Types, Document, ClientSession} from 'mongoose'
import {generatePassword} from "../Utils/Shared";
import {CONFIGURATION} from "../config";
import {Category, categorySchema, ICategory} from "./Category";
import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

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

// @ts-ignore
interface IUserModel extends Model<IUser>{
    /** Fetches user by its email address */
    findByEmail(session: ClientSession, name: string): Promise<IUser>,
    addNewCategory(session: ClientSession, userId: mongoose.Schema.Types.ObjectId, category: {name: String}): Promise<ICategory>
}

const userSchema = new Schema<IUser, IUserModel>({
    displayName: { type: String, required: true},
    emailAddress: { type: String, required: true, unique: true},
    phoneNumber: { type: String, required: false},
    password: { type: String, required: true},
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
 * Creates and adds a new category to a specific user
 * @param session Associated session
 * @param userId Unique identifier of user the new category should be added to
 * @param category Data of new category to be created
 */
async function addNewCategory(session: ClientSession, userId: mongoose.Schema.Types.ObjectId, category: {name: string}){
    try{
        const newCategory = (await Category.create([category], {session}))[0];

        await User.findOneAndUpdate(
            {_id: userId},
            {$push:{categories: newCategory._id}},
            {session: session}
        )

        return newCategory;

    }catch(err: unknown){
        console.log(err);
        throw new Error("Failed to create new user!")
    }
}
userSchema.static('addNewCategory', addNewCategory);



userSchema.pre("save", function(next){

    // @ts-ignore
    if(!this.$isNew)
        this.updatedAt = new Date(Date.now());
    next();
})

//#endregion



export const User = model<IUser, IUserModel>('User', userSchema);

