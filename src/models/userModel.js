import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    age: {type:Number,require:true},
    email: {type:String,require:true},  
    password: {type:String,require:true}
})

userSchema.plugin(mongoosePaginate);
export const userModel = mongoose.model(userCollection,userSchema);