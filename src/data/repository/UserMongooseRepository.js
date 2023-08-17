import User from "../../domain/entities/User.js";
import { userModel } from "../models/userModel.js";


class UserMongooseRepository{

    async create(user)
    {
        const newUser = await userModel.create(user);
        return new User({
            id:newUser?._id,
            firstName: newUser?.firstName,
            lastName: newUser?.lastName,
            email: newUser?.email,
            age:newUser?.age

        })
    }

    async findByFilter(filter)
    {
        let query = {};
        query[filter.field]=filter.value;
        const userDocument = await userModel.findOne(query).populate('role');
        if(!userDocument)
        {
            throw new Error(`No se encuentra ${filter.field}: ${filter.value}`,{casuse:'Not Found'});
        }
        return new User({
            id:userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age:userDocument?.age,
            password:userDocument?.password,
            cart: userDocument?.cart,
            role: userDocument?.role
        })
    }

    async findById(uid)
    {
        const user = await userModel.findById(uid).populate('role');
        if(!user)
        {
            throw new Error(`El usuario con id ${uid} no existe`,{cause:'Not Found'});
        }
        return new User({
            id:user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            age:user?.age,
            role: user.role,
        })
    }

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

    async deleteOne(uid)
    {
        const result = await userModel.deleteOne({_id:uid});
        if(!result.deletedCount)
        {
            throw new Error("No se pudo eliminar el usuario",{cause:'Not Found'});
        }
        return {
            message:"Usuario eliminado!",
            ...result};
    }

    async update(uid,data)
    {
        const userDocument = await userModel.findOneAndUpdate({_id:uid},data,{new:true}).populate('role');
        if(!userDocument)
        {
            throw new Error(`No se encuentra el usuario ${uid}`,{cause:'Not Found'});
        }
        return new User({
            id:userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age:userDocument?.age,
            role: userDocument.role
        })
    }
}

export default UserMongooseRepository;