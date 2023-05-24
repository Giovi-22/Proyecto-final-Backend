import { roleModel } from "../models/roleModel";

class RoleDAO
{

    async insert(data)
    {
        const result = await roleModel.create(data);
        return result;
    }

    async getOne(rid)
    {
        const result = await roleModel.findOne({_id:rid});
        return {
            id:result._id,
            role: result.name,
            permissions: [...result.permissions]
        };
    }
}

export default RoleDAO;