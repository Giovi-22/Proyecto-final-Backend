import container from '../../container.js';
import { idValidation, productUpdateSchema, productZodSchema } from '../validations/validators.js';

class ProductManager
{
    #productManagerDAO;

    constructor()
    {
        this.#productManagerDAO = container.resolve('ProductDao');
    }

    async add(product)
    {
        await productZodSchema.parseAsync(product);
        const codeExist = await this.#productManagerDAO.findByFilter({code:{$eq:product.code}});
        if(codeExist.length)
        {
            throw new Error('El código del producto ya existe',{cause:'Bad Request'});
        }
        const newProduct = await this.#productManagerDAO.insertOne(product);
        return newProduct;  
    }

    async get(options)
    {
        const products = await this.#productManagerDAO.Paginate(options);
        return products;
    }

    async getOne(pid)
    {
        await idValidation.parseAsync(pid);
        const product = await this.#productManagerDAO.findById(pid);
        return product;        
    }

    async update(pid,data)
    {
        await idValidation.parseAsync(pid);
        await productUpdateSchema.parseAsync(data);
        const updatedProduct = await this.#productManagerDAO.update(pid,data);
        return updatedProduct;
    }
    async deleteOne(pid)
    {
        await idValidation.parseAsync(pid);
        const productDeleted = await this.update(pid,{status:false});
        return productDeleted;
    }
}

export default ProductManager;