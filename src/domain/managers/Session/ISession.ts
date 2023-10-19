import { IRole } from "../../entities/Role/IRole"

export interface ICredential{
    user:{
        id:string,
        email: string,
        isAdmin: boolean,
        role: IRole
    }
}