import Product from "../../domain/entities/Product.js";
import { productModel } from "../models/productModel.js";

class ProductMongooseRepository{

    async insertOne(product)
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
            category: newProduct.category,
            owner: newProduct.owner
        })  
    }
    async findByFilter(filter)
    {
        const products = await productModel.find(filter);
        return products.map(product => new Product(product));     
    }

    async Paginate({limit,page,sort,filter})
    {
        const options = {
            limit: limit,
            page: page,
            sort:{'price':sort,'_id':1}, //condicion requerida en la entrega
        }
        //Model.paginate([query],[options],[callback])
        const result = await productModel.paginate(filter,options);
        Object.assign(result,
            {
                docs: result.docs.map(product => new Product(
                    {
                        id: product._id.toString(),
                        title: product.title,
                        description: product.description,
                        category: product.category,
                        price: product.price,
                        stock: product.stock,
                        thumbnail: product.thumbnail,
                        code: product.code,
                        status: product.status,
                        owner: product.owner,
                    }
                )),
            });
        return result;
    }
    
    async findById(pid)
    {
        const product = await productModel.findById(pid);
        if(!product){
            throw new Error(`Product ${pid} not found`,{cause: 'Not Found'})
        }
        return {
            id: (product._id).toString(),
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            thumbnail: product.thumbnail,
            stock: product.stock,
            code: product.code,
            status: product.status,
            owner: product.owner,
        }
    }

    async update(pid,data)
    {
        const productUpdated = await productModel.findOneAndUpdate({_id:pid},data,{new:true});
        if(!productUpdated){
            throw new Error(`Product ${pid} not found`,{cause:'Not Found'})
        }
        return {
                id: productUpdated._id,
                title: productUpdated.title,
                description: productUpdated.description,
                price: productUpdated.price,
                thumbnail: productUpdated.thumbnail,
                stock: productUpdated.stock,
                code: productUpdated.code,
                status: productUpdated.status,
                category: productUpdated.category,
                owner: productUpdated.owner,
        }
    }
}

export default ProductMongooseRepository;