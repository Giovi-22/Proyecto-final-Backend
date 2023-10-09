import mongoose, {Model} from 'mongoose'
import { IRole } from '../../domain/entities/Role/IRole';

const rolesCollection = 'roles';


const roleSchema = new mongoose.Schema<IRole>({
    name: {type:String,required:true, index:true},
    permissions: [{type:String, required:true}]
})


export const roleModel:Model<IRole> = mongoose.model(rolesCollection,roleSchema);