import container from "../../container";
import CustomErrors from "../../shared/CustomErrors";
import { IRole } from "../entities/Role/IRole";
import { idValidation } from "../validations/validators";

class RoleManager
{

    #roleRepository;

    constructor()
    {
        this.#roleRepository = container.resolve('RoleRepository');
    }
    async create(data:IRole)
    {
        const newRole = await this.#roleRepository.insert(data);
        return newRole;
    }

    async getOne(rid:string)
    {
        idValidation.parse(rid);
        const role = await this.#roleRepository.getOne(rid);
        return role;
    }

    async addPermission(rid:string,permission:string)
    {
        {   
            idValidation.parse(rid);
            const role = await this.getOne(rid);
            if(!role){
                throw new CustomErrors('El permiso ya existe',{cause:'Bad Request'}) 
            }
            const result = role.permissions.find((element:string) => element === permission);
            if(result)
            {
               throw new CustomErrors('El permiso ya existe',{cause:'Bad Request'}) 
            }
            role.permissions.push(permission);
            const updatedRole = await this.#roleRepository.updatePermission(rid,role.permissions);
            return updatedRole;
        }
    }

    async deletePermission(rid:string,permission:string)
    {
        {   
            idValidation.parse(rid);
            console.log(permission)
            const role = await this.getOne(rid);
            const result = role.permissions.filter((element:string) => element !== permission);
            console.log(result)
            role.permissions = [...result];
            const updatedRole = await this.#roleRepository.updatePermission(rid,role.permissions);
            return updatedRole;
        }
    }

}

export default RoleManager;