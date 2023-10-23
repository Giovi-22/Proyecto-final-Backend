import { IUser } from "../../../domain/entities/User/IUser";
import User from "../../../domain/entities/User/User";
import { MyOptions, userModel } from "../../models/User/userModel";
import CustomErrors from '../../../shared/CustomErrors';
import { IFilter, IPaginationFilters, QueryFilter } from "../../../shared/Interfaces/IShared";
import { IUserRepository } from "./IUserRepository";
import { IUserPaginate } from "../../models/User/IUserModel";


class UserMongooseRepository implements IUserRepository{

    async create(user:IUser)
    {
        const newUser = await userModel.create(user);
        return new User({
            id:(newUser._id).toString(),
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            age:newUser.age,
            cart:newUser.cart,
            isAdmin:newUser.isAdmin,
            password:newUser.password,
            role:newUser.role
        })
    }

    async findByFilter(filter:IFilter)
    {
        let query:QueryFilter = {};
        query[filter.field]=filter.value;
        console.log("la query es: ",query)
        const userDocument = await userModel.findOne(query).populate('role');

        if(!userDocument)
        {
            throw new CustomErrors(`No se encuentra ${filter.field}: ${filter.value}`,{cause:'Not Found'});
        }
        return new User({
            id:userDocument?._id.toString(),
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age:userDocument?.age,
            password:userDocument?.password,
            cart: userDocument?.cart,
            role: userDocument?.role,
            isAdmin:userDocument.isAdmin
        })

    }

    async findById(uid:string)
    {
        const user = await userModel.findById(uid);
        if(!user)
        {
            throw new CustomErrors(`El usuario con id ${uid} no existe`,{cause:"Not Found"});
        }
        return new User({
            id:(user._id).toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            cart: user.cart,
            isAdmin: user.isAdmin,
            password: user.password,
            role: user.role
        })
    }

    async Paginate(filters:IPaginationFilters,query:Object):Promise<IUserPaginate>
    {

        const options:MyOptions = {
            page:filters?.page || 1,
            limit: filters?.limit || 5,
            sort:filters?.sort || ""
        }

        const result = await userModel.paginate({...query},options);
        if(!result){
            throw new CustomErrors("Users don't found",{cause:'Bad Request'});
        }
        console.log("La paginacion es: ")
        console.log(result)
        return {
            docs:[],
            hasNextPage:false,
            hasPrevPage:false,
            limit:10,
            pagingCounter:1,
            totalDocs:1,
            totalPages:1,
            nextPage:0,
            page:1,
            total:1
        };
/*
        return {
            ...result,
            docs:result.docs.map(user =>new User(
                {
                    age:user.age,
                    id:(user._id).toString(),
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    cart:user.cart,
                    isAdmin:user.isAdmin,
                    password:user.password,
                    role:user.role

                }))
        }
        */
    }

    async deleteOne(uid:string)
    {
        const result = await userModel.deleteOne({_id:uid});
        if(!result.deletedCount)
        {
            throw new CustomErrors("No se pudo eliminar el usuario",{cause:'Not Found'});
        }
        return {
            message:"Usuario eliminado!",
            ...result};
    }

    async update(uid:string,data:Partial<IUser>)
    {
        const userDocument = await userModel.findOneAndUpdate({_id:uid},data,{new:true});
        if(!userDocument)
        {
            throw new CustomErrors(`No se encuentra el usuario ${uid}`,{cause:'Not Found'});
        }
        return new User({
            id:(userDocument._id).toString(),
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            cart: userDocument.cart,
            isAdmin: userDocument.isAdmin,
            password: userDocument.password,
            role: userDocument.role
        })
    }
}

export default UserMongooseRepository;