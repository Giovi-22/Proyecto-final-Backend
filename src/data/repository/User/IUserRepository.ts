import { IUser } from "../../../domain/entities/User/IUser";
import { IFilter, IPaginationFilters } from "../../../shared/Interfaces/IShared";
import { IUserPaginate } from "../../models/User/IUserModel";


export interface IUserRepository{

    create(user:IUser):Promise<IUser>,
    findByFilter(filter:IFilter):Promise<IUser>,
    findById(uid:string):Promise<IUser>,
    deleteOne(uid:string):Promise<{message:string}>,
    update(uid:string,data:Partial<IUser>):Promise<IUser>
    Paginate(filters:IPaginationFilters,query:Object):Promise<IUserPaginate>
}
