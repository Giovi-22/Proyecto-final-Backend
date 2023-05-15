import { productModel } from "../models/productModel.js";

class ProductMongooseDAO{

    async insertOne(product){
        try {
            const newProduct = await productModel.create(product);
        return {
            id: newProduct._id,
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            stock: newProduct.stock,
            code: newProduct.code,
            status: newProduct.status,
            category: newProduct.category
        }
            
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
        
    }
    async findByFilter(filter){
        try {
            const products = await productModel.find(filter);
            return products;
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
        
    }

    async Paginate({limit,page,sort,filter}){
        try {
            const options = {
                limit: limit,
                page: page,
                sort:{'price':sort,'_id':1}, //condicion requerida en la entrega
            }
            //Model.paginate([query],[options],[callback])
            const result = await productModel.paginate(filter,options);
            Object.assign(result,
                {docs: result.docs.map(product => ({
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
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }

    }
    
    async findById(pid){
        try {
            const product = await productModel.findById(pid);
           return {
                id: (product._id).toString(),
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock,
                code: product.code,
                status: product.status   
            }
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async update(pid,data){
        try {
            const productUpdated = await productModel.findOneAndUpdate({_id:pid},data,{new:true});
            return {
                    id: productUpdated._id,
                    title: productUpdated.title,
                    description: productUpdated.description,
                    price: productUpdated.price,
                    thumbnail: productUpdated.thumbnail,
                    stock: productUpdated.stock,
                    code: productUpdated.code,
                    status: productUpdated.status,
                    category: productUpdated.category
            }
            
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }
}

export default ProductMongooseDAO;