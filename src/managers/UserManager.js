import UserMongooseDAO from "../daos/userMongooseDAO.js";
import { hashPassword } from "../helpers/bcrypt.js";



class UserManager{
        #userMongooseDAO;
    constructor(){
        this.#userMongooseDAO = new UserMongooseDAO();
    }
    async create(user){
        try {
            const newUser = {...user,password: await hashPassword(user.password)};
            const result = await this.#userMongooseDAO.create(newUser);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getList(filters){
        try {
            const result = await this.#userMongooseDAO.Paginate(filters);
            return result;
        } catch (error) {
            throw new Error(error.message,{cause: error.cause || 500});
        }
    }

    async findByFilter(filter){
        try {
            if(!filter.field && !filter.value){
                throw new Error("Todos los campos deben ser completados",{cause:404});
            }
            const result = await this.#userMongooseDAO.findByFilter(filter);
            return result;
        } catch (error) {
            throw new Error(error.message,{cause: error.cause || 500});   
        }
    }
    async getById(uid){
        try {
            const user = await this.#userMongooseDAO.findById(uid);
            return user;
        } catch (error) {
            throw new Error(error.message,{cause: error.cause || 500});
        }
        
    }

    async updateOne(uid,data){
        try {
            if(data?.password){
                throw new Error("no tiene permisos para actualizar el password",{cause:403})
            }
            const userUpdated = await this.#userMongooseDAO.update(uid,data);
            return userUpdated;
        } catch (error) {
            throw new Error(error.message,{cause: error.cause || 500});
        }
    }
    
    async deleteOne(uid){
        try {
            const deletedUser = await this.#userMongooseDAO.deleteOne(uid);
            return deletedUser;
        } catch (error) {
            throw new Error(error.message,{cause: error.cause || 500});
        }
    }

    
}

export default UserManager;