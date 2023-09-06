import container from '../../container.js';
import { idValidation } from '../validations/validators.js';

class RoleManager
{

    #roleRepository;

    constructor()
    {
        this.#roleRepository = container.resolve('RoleRepository');
    }
    async create(data)
    {
        const newRole = await this.#roleRepository.create(data);
        return newRole;
    }

    async getOne(rid)
    {
        idValidation.parse(rid);
        const role = await this.#roleRepository.getOne(rid);
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
               throw new Error('The permission already exists',{cuase:'Bad Request'}) 
            }
            role.permissions.push(permission);
            const updatedRole = await this.#roleRepository.updatePermission(rid,role.permissions);
            return updatedRole;
        }
    }

    async deletePermission(rid,permission)
    {
        {   
            idValidation.parse(rid);
            const role = await this.getOne(rid);
            const result = role.permissions.filter(element => element !== permission);
            role.permissions = [...result];
            const updatedRole = await this.#roleRepository.updatePermission(rid,role.permissions);
            return updatedRole;
        }
    }

}

export default RoleManager;