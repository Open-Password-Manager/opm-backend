import {Schema, model} from 'mongoose'
import {CONFIGURATION} from "../config";
import {entrySchema} from "./Entry";
import * as mongoose from "mongoose";


export interface ICategory{
    /** Name of user to be displayed */
    name: string,
    /** Entries */
    //@ts-ignore
    entries: [entrySchema]
    /** Subcategories */
    //@ts-ignore
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
   
}

export const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true},
    //@ts-ignore
    entries: {type: [entrySchema], required: true, default: []}
});

export const Category = model<ICategory>('Category', categorySchema);

