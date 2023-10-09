import container from '../../container';
import CustomErrors from '../../shared/CustomErrors';
import { hashPassword } from '../../shared/bcrypt';
import { IFilter } from '../../shared/interfaces/IShared';
import { IUser } from '../entities/User/IUser';
import { idValidation, userZodSchema } from '../validations/validators';



class UserManager
{
        #UserRepository;

    constructor()
    {
        this.#UserRepository = container.resolve('UserRepository');
    }

    async create(user:IUser)
    {
        await userZodSchema.parseAsync(user);
        const newUser = {...user,password: await hashPassword(user.password)};
        const result = await this.#UserRepository.create(newUser);
        return {
            id: result?._id,
            firstName: result?.firstName,
            lastName: result?.lastName,
            age: result?.age,
            email: result?.email,
            cart: result?.cart,
            role: result?.role,
            isAdmin: result?.isAdmin
        }
    }
/*
    async getList(filters)
    {
        const result = await this.#UserRepository.Paginate(filters);
        return result;
    }
*/

    async findByFilter(filter:IFilter):Promise<IUser>
    {
        console.log("el filtro: ",filter)
        if(!filter.field && !filter.value)
        {
            throw new CustomErrors('All fields must be completed',{cause:'Bad Request'});
        }
        const result = await this.#UserRepository.findByFilter(filter);
        return result;
    }


    async getById(uid:string)
    {
        await idValidation.parseAsync(uid);
        const user = await this.#UserRepository.findById(uid);
        return user;
    }

    async updateOne(uid:string,data:Partial<IUser>)
    {   
        await idValidation.parseAsync(uid);
        const userUpdated = await this.#UserRepository.update(uid,data);
        return userUpdated;
    }
    
    async deleteOne(uid:string)
    {
        await idValidation.parseAsync(uid);
        const deletedUser = await this.#UserRepository.deleteOne(uid);
        return deletedUser;
    }

}

export default UserManager;