import container from '../../../container';
import CustomErrors from '../../../shared/CustomErrors';
import { hashPassword } from '../../../shared/bcrypt';
import { IFilter, IPaginationFilters } from '../../../shared/Interfaces/IShared';
import { IUser } from '../../entities/User/IUser';
import { idValidation, userZodSchema } from '../../validations/validators';
import { IUserRepository } from '../../../data/repository/User/IUserRepository';
import { IUserManager } from './IUserManager';



class UserManager implements IUserManager
{
        #UserRepository:IUserRepository;

    constructor()
    {
        this.#UserRepository = container.resolve('UserRepository');
    }

    async create(user:IUser)
    {
        await userZodSchema.parseAsync(user);
        const newUser = {...user,password: await hashPassword(user.password)};
        const result = await this.#UserRepository.create(newUser);
        return result;
    }

    async getList(filters:IPaginationFilters,query:Object)
    {
        const result = await this.#UserRepository.Paginate(filters,query);
        return result;
    }


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