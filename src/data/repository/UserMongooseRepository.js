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
            age:newUser?.age,
            role: newUser?.role,
            cart: newUser?.cart,
            documents: newUser?.documents,
            isAdmin: newUser?.isAdmin,
            lastConnection : newUser?.lastConnection,
            status: newUser?.status
        })
    }

    async findByFilter(filter)
    {
        let query = {};
        query[filter.field]=filter.value;
        const userDocument = await userModel.findOne(query).populate('role');
        if(!userDocument)
        {
            throw new Error(`Not found ${filter.field}: ${filter.value}`,{casuse:'Not Found'});
        }
        return new User({
            id:userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age:userDocument?.age,
            password:userDocument?.password,
            cart: userDocument?.cart,
            role: userDocument?.role,
            documents: userDocument?.documents,
            isAdmin: userDocument?.isAdmin,
            lastConnection : userDocument?.lastConnection,
            status: userDocument?.status
        })
    }

    async findById(uid)
    {
        const user = await userModel.findById(uid).populate('role');
        if(!user)
        {
            throw new Error(`The user ${uid} not found`,{cause:'Not Found'});
        }
        return new User({
            id:user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            age:user?.age,
            role: user.role,
            cart: user.cart,
            documents: user?.documents,
            isAdmin: user.isAdmin,
            lastConnection : user?.lastConnection,
            status: user?.status
        })
    }

    async Paginate(query,filters)
    {
        const options = {
            page:filters.page,
            limit: filters.limit,
            sort:filters.sort,
            pagination: filters.pagination ?? true
        }
        const result = await userModel.paginate(query,options);
        return {
            ...result,
            docs:result.docs.map(user =>new User(
                {
                    id:user?._id,
                    firstName:user?.firstName,
                    lastName:user?.lastName,
                    email:user?.email,
                    age:user?.age,
                    role:user?.role,
                    cart:user?.cart,
                    documents: user?.documents,
                    isAdmin: user?.isAdmin,
                    lastConnection : user?.lastConnection,
                    status: user?.status
                }))
        }
    }

    async deleteOne(uid)
    {
        const result = await userModel.deleteOne({_id:uid});
        if(!result.deletedCount)
        {
            throw new Error("Failed to delete user",{cause:'Not Found'});
        }
        return 'The user was deleted successfully';
 
    }

    async update(uid,data)
    {
        const userDocument = await userModel.findOneAndUpdate({_id:uid},data,{new:true}).populate('role');
        if(!userDocument)
        {
            throw new Error(`The user ${uid} not found`,{cause:'Not Found'});
        }
        return new User({
            id:userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age:userDocument?.age,
            role: userDocument?.role,
            cart: userDocument?.cart,
            documents: userDocument?.documents,
            isAdmin: userDocument?.isAdmin,
            lastConnection : userDocument?.lastConnection,
            status: userDocument?.status
        })
    }
}

export default UserMongooseRepository;