import { userModel } from "../models/userModel.js";


class UserMongooseDAO{

    async create(user)
    {
        const newUser = await userModel.create(user);
        return {
            id:newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            age:newUser.age
        }
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
        return {
            id:userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age:userDocument.age,
            password:userDocument.password,
            role: userDocument.role
        }
    }

    async findById(uid)
    {
        const user = await userModel.findById(uid);
        if(!user)
        {
            throw new Error(`El usuario con id ${uid} no existe`,{cause:'Not Found'});
        }
        return {
            id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age:user.age
        }
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
            docs:result.docs.map(user =>(
                {
                    id:user._id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    age:user.age
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
        return "Usuario eliminado!";
    }

    async update(uid,data)
    {
        const userDocument = await userModel.findOneAndUpdate({_id:uid},data,{new:true});
        if(!userDocument)
        {
            throw new Error(`No se encuentra el usuario ${uid}`,{cause:'Not Found'});
        }
        return {
            id:userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age:userDocument.age
        }
    }
}

export default UserMongooseDAO;