
import { HydratedDocument } from "mongoose";
import { IRole } from "../Role/IRole";

export interface IUser{
        id:string,
        firstName:string,
        lastName: string,
        email: string,
        age: number,
        password: string,
        role: HydratedDocument<IRole>['_id'],
        cart: string,
        isAdmin: boolean,
}

