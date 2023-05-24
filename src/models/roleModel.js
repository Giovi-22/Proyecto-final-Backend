import mongoose from 'mongoose'

const rolesCollection = 'roles';

const roleSchema = new mongoose.Schema({
    name: {type:String,required:true},
    permissions: {type:Array, required:true}
})


export const roleModel = mongoose.model(rolesCollection,roleSchema);