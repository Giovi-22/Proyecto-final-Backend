import container from '../../container.js';
import { idValidation, productUpdateSchema, productZodSchema } from '../validations/validators.js';

class ProductManager
{
    #ProductRepository;

    constructor()
    {
        this.#ProductRepository = container.resolve('ProductRepository');
    }

    async add(product)
    {
        await productZodSchema.parseAsync(product);
        const codeExist = await this.#ProductRepository.findByFilter({code:{$eq:product.code}});
        if(codeExist.length)
        {
            throw new Error('El código del producto ya existe',{cause:'Bad Request'});
        }
        const newProduct = await this.#ProductRepository.insertOne(product);
        return newProduct;  
    }

    async get(options)
    {
        const products = await this.#ProductRepository.Paginate(options);
        return products;
    }

    async getOne(pid)
    {
        await idValidation.parseAsync(pid);
        const product = await this.#ProductRepository.findById(pid);
        return product;        
    }

    async update(pid,data)
    {
        await idValidation.parseAsync(pid);
        await productUpdateSchema.parseAsync(data);
        const updatedProduct = await this.#ProductRepository.update(pid,data);
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