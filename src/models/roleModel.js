import mongoose from 'mongoose'

const rolesCollection = 'roles';

const roleSchema = new mongoose.Schema({
    name: {type:String,required:true, index:true},
    permissions: [{type:String, required:true}]
})


export const roleModel = mongoose.model(rolesCollection,roleSchema);