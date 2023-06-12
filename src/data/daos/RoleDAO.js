import { roleModel } from "../models/roleModel.js";

class RoleDAO
{

    async insert(data)
    {
        const result = await roleModel.create(data);
        return {
            id:result._id,
            name: result.name,
            permissions:[...result.permissions]
        }
    }

    async getOne(rid)
    {
        const result = await roleModel.findById(rid);
        if(!result){
            throw new Error(`No se pudo encontrar el rol con id ${rid}`,{cause:'Bad Request'});
        }
        return {
            id:result._id,
            name: result.name,
            permissions: [...result.permissions]
        };
    }

    async updatePermission(rid,data)
    {
        const result = await roleModel.findByIdAndUpdate(rid,{permissions:data},{new:true});
        return {
            id:result._id,
            name: result.name,
            permissions: [...result.permissions]
        };
    }
}

export default RoleDAO;