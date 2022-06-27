import {Schema, model} from 'mongoose'
import {CONFIGURATION} from "../config";


export interface IEntry{
    /** Name of user to be displayed */
    name: string,

}

export const entrySchema = new Schema<IEntry>({
    name: { type: String, required: true},
});

export const Category = model<IEntry>('Entry', entrySchema);