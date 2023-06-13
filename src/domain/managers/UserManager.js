import UserMongooseDAO from '../../data/daos/userMongooseDAO.js';
import { hashPassword } from '../../helpers/bcrypt.js';
import { idValidation, userZodSchema } from '../validations/validators.js';



class UserManager
{
        #userMongooseDAO;

    constructor()
    {
        this.#userMongooseDAO = new UserMongooseDAO();
    }

    async create(user)
    {
        await userZodSchema.parseAsync(newUser);
        const newUser = {...user,password: await hashPassword(user.password)};
        const result = await this.#userMongooseDAO.create(newUser);
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
        const result = await this.#userMongooseDAO.Paginate(filters);
        return result;
    }

    async findByFilter(filter)
    {
        if(!filter.field && !filter.value)
        {
            throw new Error('Todos los campos deben ser completados',{cause:'Bad Request'});
        }
        const result = await this.#userMongooseDAO.findByFilter(filter);
        return result;
    }
    async getById(uid)
    {
        await idValidation.parseAsync(uid);
        const user = await this.#userMongooseDAO.findById(uid);
        return user;
    }

    async updateOne(uid,data)
    {
        await idValidation.parseAsync(uid);
        if(data?.password)
        {
            throw new Error('no tiene permisos para actualizar el password',{cause:'Forbidden'})
        }
        const userUpdated = await this.#userMongooseDAO.update(uid,data);
        return userUpdated;
    }
    
    async deleteOne(uid)
    {
        await idValidation.parseAsync(uid);
        const deletedUser = await this.#userMongooseDAO.deleteOne(uid);
        return deletedUser;
    }

}

export default UserManager;