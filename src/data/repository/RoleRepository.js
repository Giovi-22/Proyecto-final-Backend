import Role from "../../domain/entities/Role.js";
import { roleModel } from "../models/roleModel.js";

class RoleRepository
{

    async create(data)
    {
        const result = await roleModel.create(data);
        return new Role({
            id:result._id,
            name: result.name,
            permissions:[...result.permissions]
        });
    }

    async getOne(rid)
    {
        const result = await roleModel.findById(rid);
        if(!result){
            throw new Error(`Role id ${rid} not found`,{cause:'Not Found'});
        }
        return new Role({
            id:result._id,
            name: result.name,
            permissions:[...result.permissions]
        });
    }

    async updatePermission(rid,data)
    {
        const result = await roleModel.findByIdAndUpdate(rid,{permissions:data},{new:true});
        if(!result){
            throw new Error(`Role ${rid} not found`,{cause: 'Not Found'})
        }
        return new Role({
            id:result._id,
            name: result.name,
            permissions:[...result.permissions]
        });
    }
}

export default RoleRepository;