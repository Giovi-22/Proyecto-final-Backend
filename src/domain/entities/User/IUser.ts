import { IRole } from "../Role/IRole";

export interface IUser{
        id:string,
        firstName:string,
        lastName: string,
        email: string,
        age: number,
        password: string,
        role: IRole,
        cart: string,
        isAdmin: boolean,
}

