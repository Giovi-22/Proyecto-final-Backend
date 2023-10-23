import { Document, PaginateResult } from "mongoose";
import { IRole } from "../../../domain/entities/Role/IRole";
import { IUser } from "../../../domain/entities/User/IUser";

export interface IUserModel extends Document{ 
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

export interface IUserPaginate extends PaginateResult<IUser>{};