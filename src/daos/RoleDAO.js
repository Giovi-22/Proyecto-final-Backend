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
        const result = await roleModel.findOne({_id:rid});
        return {
            id:result._id,
            name: result.name,
            permissions: [...result.permissions]
        };
    }
}

export default RoleDAO;