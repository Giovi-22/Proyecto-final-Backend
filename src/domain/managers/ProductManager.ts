import container from '../../container';
import { IProduct } from '../entities/Product/IProduct';
import { idValidation, productUpdateSchema, productZodSchema } from '../validations/validators';
import { IPaginationFilters } from '../../shared/Interfaces/IShared';

class ProductManager
{
    #ProductRepository;

    constructor()
    {
        this.#ProductRepository = container.resolve('ProductRepository');
    }

    async add(product:IProduct)
    {
        await productZodSchema.parseAsync(product);
        const codeExist = await this.#ProductRepository.findByFilter({code:{$eq:product.code}});
        if(codeExist.length)
        {
            throw new Error('Bad Request, El código del producto ya existe');
        }
        const newProduct = await this.#ProductRepository.insertOne(product);
        return newProduct;  
    }

    async get(options:IPaginationFilters)
    {
        const products = await this.#ProductRepository.Paginate(options);
        return products;
    }

    async getOne(pid:string)
    {
        await idValidation.parseAsync(pid);
        const product = await this.#ProductRepository.findById(pid);
        return product;        
    }

    async update(pid:string,data:Partial<IProduct>)
    {
        await idValidation.parseAsync(pid);
        await productUpdateSchema.parseAsync(data);
        const updatedProduct = await this.#ProductRepository.update(pid,data);
        return updatedProduct;
    }

    async deleteOne(pid:string)
    {
        await idValidation.parseAsync(pid);
        const productDeleted = await this.update(pid,{status:false});
        return productDeleted;
    }
}

export default ProductManager;