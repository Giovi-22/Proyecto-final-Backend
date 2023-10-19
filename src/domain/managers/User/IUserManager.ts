import { IFilter } from "../../../shared/Interfaces/IShared";
import { IUser } from "../../entities/User/IUser";

export interface IUserManager
{

    create(user:IUser):Promise<IUser>,
    findByFilter(filter:IFilter):Promise<IUser>,
    getById(uid:string):Promise<IUser>,
    updateOne(uid:string,data:Partial<IUser>):Promise<IUser>,
    deleteOne(uid:string):Promise<{message:string}>
/*
    async getList(filters)
    {
        const result = await this.#UserRepository.Paginate(filters);
        return result;
    }
*/



}