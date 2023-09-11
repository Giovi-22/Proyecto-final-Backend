import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    age: {type:Number,require:true},
    email: {type:String,require:true,unique:true},  
    password: {type:String,require:true},
    cart: [{type:mongoose.Schema.Types.ObjectId,ref:'carts',default:null}],
    role: {type:mongoose.Schema.Types.ObjectId,ref:'roles',default:"647fd20fb16b39892de4c6aa"}, //por defecto es el role client
    isAdmin: {type:mongoose.Schema.Types.Boolean,default:false},
    documents:
        {
            profiles:[{
                name:{type:String,default:null},
                reference:{type:String,default:null}
            }],
            products:[{
                name:{type:String,default:null},
                reference:{type:String,default:null}
            }],
            documents:[{
                name:{type:String,default:null},
                reference:{type:String,default:null}
            }]
        },
    lastConnection:{type:String,default:null},
    status: {type:mongoose.Schema.Types.Boolean,require:true,default: true}
})

userSchema.plugin(mongoosePaginate);
export const userModel = mongoose.model(userCollection,userSchema);