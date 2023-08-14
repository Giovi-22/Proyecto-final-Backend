import { IRole } from "./IRole";

class Role
{
    id:string;
    name:string;
    permissions:string[];

    constructor(role:IRole){
        this.id= role.id;
        this.name= role.name;
        this.permissions= [...role.permissions];
    }
}

export default Role;