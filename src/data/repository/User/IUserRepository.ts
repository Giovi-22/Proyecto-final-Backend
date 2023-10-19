import { IUser } from "../../../domain/entities/User/IUser";
import { IFilter } from "../../../shared/Interfaces/IShared";


export interface IUserRepository{

    create(user:IUser):Promise<IUser>,
    findByFilter(filter:IFilter):Promise<IUser>,
    findById(uid:string):Promise<IUser>,
    deleteOne(uid:string):Promise<{message:string}>,
    update(uid:string,data:Partial<IUser>):Promise<IUser>
/*
    async Paginate(filters)
    {
        const options = {
            page:filters?.page,
            limit: filters?.limit,
            sort:filters?.sort
        }
        const result = await userModel.paginate(filters?.query,options);
        return {
            ...result,
            docs:result.docs.map(user =>new User(
                {
                    id:user?._id,
                    firstName:user?.firstName,
                    lastName:user?.lastName,
                    email:user?.email,
                    age:user?.age
                }))
        }
    }
*/

}
