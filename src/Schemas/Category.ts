import {Schema, model} from 'mongoose'
import {CONFIGURATION} from "../config";
import {entrySchema} from "./Entry";


export interface ICategory{
    /** Name of user to be displayed */
    name: string,
    /** Entries */
    //@ts-ignore
    entries: [entrySchema]
    /** Subcategories */
    //@ts-ignore
    categories: [categorySchema]
   
}

export const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true},
    //@ts-ignore
    entries: {type: [entrySchema], required: true, default: []}
});

export const Category = model<ICategory>('Category', categorySchema);

