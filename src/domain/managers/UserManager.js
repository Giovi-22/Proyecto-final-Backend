import container from '../../container.js';
import { hashPassword } from '../../shared/bcrypt.js';
import { idValidation, userZodSchema } from '../validations/validators.js';



class UserManager
{
        #UserRepository;

    constructor()
    {
        this.#UserRepository = container.resolve('UserRepository');
    }

    async create(user)
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

    async getList(filters)
    {
        const result = await this.#UserRepository.Paginate(filters);
        return result;
    }

    async findByFilter(filter)
    {
        if(!filter.field && !filter.value)
        {
            throw new Error('Todos los campos deben ser completados',{cause:'Bad Request'});
        }
        const result = await this.#UserRepository.findByFilter(filter);
        return result;
    }
    async getById(uid)
    {
        await idValidation.parseAsync(uid);
        const user = await this.#UserRepository.findById(uid);
        return user;
    }

    async updateOne(uid,data)
    {   
        await idValidation.parseAsync(uid);
        const userUpdated = await this.#UserRepository.update(uid,data);
        return userUpdated;
    }
    
    async deleteOne(uid)
    {
        await idValidation.parseAsync(uid);
        const deletedUser = await this.#UserRepository.deleteOne(uid);
        return deletedUser;
    }

}

export default UserManager;