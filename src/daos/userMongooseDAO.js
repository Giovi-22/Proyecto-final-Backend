import { userModel } from "../models/userModel.js";


class UserMongooseDAO{

    async create(user){
        try {
            const newUser = await userModel.create(user);
            return {
                id:newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                age:newUser.age
            }
            
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async findByFilter(filter){
        let query = {};
        query[filter.field]=filter.value;
        try {
            const userDocument = await userModel.findOne(query);
            if(!userDocument){
                throw new Error(`No se encuentra ${filter.field}: ${filter.value}`,{casuse:404});
            }
            return {
                id:userDocument._id,
                firstName: userDocument.firstName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                age:userDocument.age,
                password:userDocument.password
            }
        } catch (error) {
            
        }
    }

    async findById(uid){
        try {
            const user = await userModel.findById(uid);
            if(!user){
                throw new Error(`El usuario con id ${uid} no existe`,{cause:404});
            }
            return {
                id:user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age:user.age
            }
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async Paginate(filters){
        const options = {
            page:filters?.page,
            limit: filters?.limit,
            sort:filters?.sort
        }
        try {
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
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500}); 
        }
    }

    async deleteOne(uid){
        try {
            const result = await userModel.deleteOne({_id:uid});
            if(!result.deletedCount){
                throw new Error("No se pudo eliminar el usuario");
            }
            return "Usuario eliminado!";
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500}); 
        }
    }

    async update(uid,data){
        try {
            const userDocument = await userModel.findOneAndUpdate({_id:uid},data,{new:true});
            if(!userDocument){
                throw new Error(`No se encuentra el usuario ${uid}`,{cause:404});
            }
            return {
                id:userDocument._id,
                firstName: userDocument.firstName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                age:userDocument.age
            }
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500}); 
        }
    }
}

export default UserMongooseDAO;