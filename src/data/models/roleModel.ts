import mongoose from 'mongoose'
import { IRole } from '../../domain/entities/Role/IRole';

const rolesCollection = 'roles';


const roleSchema = new mongoose.Schema<IRole>({
    name: {type:String,required:true, index:true},
    permissions: [{type:String, required:true}]
})


export const roleModel = mongoose.model<IRole>(rolesCollection,roleSchema);