import container from '../../container.js';
import { hashPassword } from '../../helpers/bcrypt.js';
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
        return result;
    }

    async getList(filters)
    {
        console.log("dentro del manager")
        const result = await this.#UserRepository.Paginate(filters);
        return result;
    }

    async findByFilter(filter)
    {
        if(!filter.field && !filter.value)
        {
            throw new Error('All fields must be completed',{cause:'Bad Request'});
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
        if(data?.password){
            throw new Error("The password field can't be updated",{cause:'Bad Request'});
        }
        await idValidation.parseAsync(uid);
        const userUpdated = await this.#UserRepository.update(uid,data);
        return userUpdated;
    }
    
    async deleteOne(uid)
    {
        await idValidation.parseAsync(uid);
        return this.#UserRepository.deleteOne(uid);
    }

    async changePassword(uid,password)
    {   
        await idValidation.parseAsync(uid);
        const userUpdated = await this.#UserRepository.update(uid,{password});
        return userUpdated;
    }

    async loadDocuments(uid,files){
        const user = await this.getById(uid);
        if(files.profiles){
            if(user.documents.profiles){
                Object.assign(user.documents.profiles,[...user.documents.profiles,...files.profiles]);
            }else{
                user.documents.profiles = [...files.profiles];
            }
        }

        if(files.products){
            if(user.documents.products){
                Object.assign(user.documents.products,[...user.documents.products,...files.products]);
            }else{
                user.documents.products = [...files.products];
            }
        }

        if(files.documents){
            if(user.documents.documents){
                Object.assign(user.documents.documents,[...user.documents.documents,...files.documents]);
            }else{
                user.documents.documents = [...files.documents];
            }
        }
        const result = await this.updateOne(uid,{documents:user.documents});
        return result;
    }

    async premiumUser(uid){
        const requiredDocuments = ['dni','address','account']
        const user = await this.getById(uid);
        const documentsNames = user.documents.documents.map(doc=>doc.name);
        const result = requiredDocuments.map(doc=>documentsNames.some(element=>element.includes(doc)))
        const haveAllDocuments = result.every(doc=>doc === true);
        if(!haveAllDocuments){
            throw new Error("Can't change the user's role to premium. The user doesn't have all the required documents.",{cause:'Bad Request'})
        }
        const updatedUser = await this.updateOne(uid,{role:"64de071ed652ca954dcfbca2"});
        return updatedUser;
    }

    async inactiveUsers(){

    }

}

export default UserManager;