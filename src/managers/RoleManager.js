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

    async findOne(rid)
    {
        const role = await this.#roleDAO.getOne(rid);
        return role;
    }

    async update(rid,data)
    {
        {
            const updatedRole = await this.#roleDAO.update(rid,data);
            return updatedRole;
        }
    }

}

export default RoleManager;