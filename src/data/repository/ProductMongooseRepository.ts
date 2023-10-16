import { IProduct } from "../../domain/entities/Product/IProduct";
import Product from "../../domain/entities/Product/Product";
import { productModel } from "../models/productModel";
import { IFilter } from '../../shared/Interfaces/IShared';

class ProductMongooseRepository{

    async insertOne(product:IProduct)
    {
        const newProduct = await productModel.create(product);
        return new Product({
            id: newProduct._id,
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            stock: newProduct.stock,
            code: newProduct.code,
            status: newProduct.status,
            category: newProduct.category
        })  
    }
    async findByFilter(filter:IFilter)
    {
        const products = await productModel.find(filter);
        return products.map(product => new Product(product));     
    }
/*
    async Paginate(filters:IPaginationFilters)
    {
        const options = {
            limit: filters.limit,
            page: filters.page,
            sort:{'price':filters.sort,'_id':1}, //condicion requerida en la entrega
        }
        //Model.paginate([query],[options],[callback])
        const result = await productModel.paginate(filter,options);
        Object.assign(result,
            {docs: result.docs.map(product => new Product({
                id: product._id.toString(),
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                thumbnail: product.thumbnail,
                code: product.code,
                status: product.status
            })),
            
        });
        return result;
    }
*/
    async findById(pid:string)
    {
        const product = await productModel.findById(pid);
        if(!product){
            throw new Error("Product don't found");
        }

        return new Product({
            id: product._id,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            thumbnail: product.thumbnail,
            stock: product.stock,
            code: product.code,
            status: product.status   
        })
    }

    async update(pid:string,data:Partial<IProduct>)
    {
        const productUpdated = await productModel.findOneAndUpdate({_id:pid},data,{new:true});
        if(!productUpdated){
            throw new Error('The update product do not found');
        }
        return new Product({
                id: productUpdated._id,
                title: productUpdated.title,
                description: productUpdated.description,
                price: productUpdated.price,
                thumbnail: productUpdated.thumbnail,
                stock: productUpdated.stock,
                code: productUpdated.code,
                status: productUpdated.status,
                category: productUpdated.category
        })
    }
}

export default ProductMongooseRepository;