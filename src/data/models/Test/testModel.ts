import mongoose from "mongoose";
//import mongoseWrapper from 'mongoose-class-wrapper';

import { ITest, ITestRole, RoleModel } from "./TestAbstract";

const testCollection = 'tests';



const testSchema = new mongoose.Schema<ITestRole, RoleModel, ITest>({
    name: {type:String,require:true},
    role: {type:mongoose.Schema.Types.ObjectId,ref:'roles'},
})

export const testModel = mongoose.model<ITestRole,RoleModel>(testCollection,testSchema);
 
//export const testModel = mongoose.model<ITestModel>(testCollection,testSchema);

