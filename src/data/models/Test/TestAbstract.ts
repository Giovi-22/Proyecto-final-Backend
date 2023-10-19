import { Model, Types } from "mongoose";
import { IRole } from "../../../domain/entities/Role/IRole";


export interface ITest{
    getRole(uid:string):Promise<IRole>
}
export interface ITestRole{
    name:string,
    role: Types.ObjectId | Object
}

export type RoleModel = Model<ITestRole,{},ITest>;