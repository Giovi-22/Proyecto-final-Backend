import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    age: {type:Number,require:true},
    email: {type:String,require:true,unique:true},  
    password: {type:String,require:true},
    cart: [{type:mongoose.Schema.Types.ObjectId,ref:'carts'}],
    role: {type:mongoose.Schema.Types.ObjectId,ref:'roles'},
    isAdmin: {type:mongoose.Schema.Types.Boolean,default:false}
})

userSchema.plugin(mongoosePaginate);
export const userModel = mongoose.model(userCollection,userSchema);