import container from "../../container.js";
import { idValidation } from "../validations/validators.js";

class RoleManager
{

    #roleDAO;

    constructor()
    {
        this.#roleDAO = container.resolve('RoleDao');
    }
    async create(data)
    {
        const newRole = await this.#roleDAO.insert(data);
        return newRole;
    }

    async getOne(rid)
    {
        idValidation.parse(rid);
        const role = await this.#roleDAO.getOne(rid);
        return role;
    }

    async addPermission(rid,permission)
    {
        {   
            idValidation.parse(rid);
            const role = await this.getOne(rid);
            const result = role.permissions.find(element => element === permission);
            if(result)
            {
               throw new Error('El permiso ya existe',{cuase:'Bad Request'}) 
            }
            role.permissions.push(permission);
            const updatedRole = await this.#roleDAO.updatePermission(rid,role.permissions);
            return updatedRole;
        }
    }

    async deletePermission(rid,permission)
    {
        {   
            idValidation.parse(rid);
            console.log(permission)
            const role = await this.getOne(rid);
            const result = role.permissions.filter(element => element !== permission);
            console.log(result)
            role.permissions = [...result];
            const updatedRole = await this.#roleDAO.updatePermission(rid,role.permissions);
            return updatedRole;
        }
    }

}

export default RoleManager;