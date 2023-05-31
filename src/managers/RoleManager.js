import RoleDAO from "../daos/RoleDAO.js";

class RoleManager
{

    #roleDAO;

    constructor()
    {
        this.#roleDAO = new RoleDAO();
    }
    async create(data)
    {
        const newRole = await this.#roleDAO.insert(data);
        return newRole;
    }

    async getOne(rid)
    {
        const role = await this.#roleDAO.getOne(rid);
        return role;
    }

    async addPermission(rid,permission)
    {
        {   
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