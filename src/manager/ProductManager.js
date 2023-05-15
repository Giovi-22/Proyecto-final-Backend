import ProductMongooseDAO from "../dao/productMongooseDAO.js";

class ProductManager{
        #productManagerDAO;
    constructor(){
        this.#productManagerDAO = new ProductMongooseDAO();
    }

    async add(product){
        try {
            
            const codeExist = await this.#productManagerDAO.findByFilter({code:{$eq:product.code}});
            if(codeExist.length){
                throw new Error("El código del producto ya existe",{cause:400});
            }
            const newProduct = await this.#productManagerDAO.insertOne(product);
            return newProduct;

        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
        
    }
    async get(options){
        try {
            const products = await this.#productManagerDAO.Paginate(options);
            return products;
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async getOne(pid){
        try {
            const product = await this.#productManagerDAO.findById(pid);
            return product;
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});  
        }
        
    }

    async update(pid,data){
        try {
            const updatedProduct = await this.#productManagerDAO.update(pid,data);
            return updatedProduct;
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500}); 
        }
        
    }
    async deleteOne(pid){
        try {
            const productDeleted = await this.update(pid,{status:false});
            return productDeleted;
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500}); 
        }
        
    }
}

export default ProductManager;