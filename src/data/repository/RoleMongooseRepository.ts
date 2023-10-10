
import { IRole } from "../../domain/entities/Role/IRole";
import Role from "../../domain/entities/Role/Role";
import CustomErrors from "../../shared/CustomErrors";
import { roleModel } from "../models/roleModel.js";

class RoleMongooseRepository
{

    async create(data:IRole)
    {
        const result = await roleModel.create(data);
        return new Role({
            id:result._id.toString(),
            name: result.name,
            permissions:[...result.permissions]
        });
    }

    async getOne(rid:string):Promise<IRole>
    {
        const result = await roleModel.findById(rid);
        if(!result){
            throw new CustomErrors(`No se pudo encontrar el rol con id ${rid}`,{cause:'Bad Request'});
        }
        return new Role({
            id:result._id.toString(),
            name: result.name,
            permissions:[...result.permissions]
        });
    }

    async updatePermission(rid:string,data:string)
    {
        const result = await roleModel.findByIdAndUpdate(rid,{permissions:data},{new:true});
        if(!result){
            throw new CustomErrors("Role don't found",{cause:'Not  Found'})
        }
        return new Role({
            id:result._id.toString(),
            name: result.name,
            permissions:[...result.permissions]
        });
    }
}

export default RoleMongooseRepository;