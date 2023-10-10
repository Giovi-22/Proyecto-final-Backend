import mongoose, { Types } from "mongoose";

const testCollection = 'tests';

export interface ITestModel{
    name:string,
    role: Types.ObjectId
}

const testSchema = new mongoose.Schema({
    name: {type:String,require:true},
    role: {type:mongoose.Schema.Types.ObjectId,ref:'roles'},
})


export const testModel = mongoose.model<ITestModel>(testCollection,testSchema);