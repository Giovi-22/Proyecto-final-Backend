import mongoose, { PaginateModel, PaginateOptions,} from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IUser } from '../../../domain/entities/User/IUser';
import { IUserModel } from "./IUserModel";

const userCollection = 'users';

const userSchema = new mongoose.Schema<IUser>({
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    age: {type:Number,require:true},
    email: {type:String,require:true,unique:true},  
    password: {type:String,require:true},
    cart: [{type:mongoose.Schema.Types.ObjectId,ref:'carts',default:null}],
    role: {type:mongoose.Schema.Types.ObjectId,default:null,ref:'roles'},
    isAdmin: {type:mongoose.Schema.Types.Boolean,default:false}
})
userSchema.plugin(paginate);

export interface MyOptions extends PaginateOptions{
    page:number,
    limit:number,
    sort:string
}
export const userModel = mongoose.model<IUserModel,PaginateModel<IUserModel>>(userCollection,userSchema,userCollection);