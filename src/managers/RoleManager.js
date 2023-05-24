import RoleDAO from "../daos/RoleDAO";

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

}

export default RoleManager;