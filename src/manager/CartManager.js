import CartMongooseDAO from "../dao/cartMongooseDAO.js";


class CartManager{
    #cartMongooseDAO;
    constructor(){
        this.#cartMongooseDAO = new CartMongooseDAO();
    }
    
    async createCart(cart){
        try {
            const newCart = await this.#cartMongooseDAO.create(cart) ;
            return newCart;
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});    
        }
    }
    async addOne(cid,pid) {
        try {
            const cart = await this.#cartMongooseDAO.findOne(cid);
            const index = cart.products.findIndex(product => product.pid.toString() === pid);
            if(index === -1){
                cart.products.push({pid:pid,quantity:1});
                return this.#cartMongooseDAO.update(cart.id,cart.products);

            }
            Object.assign(cart.products.at(index),{quantity: (cart.products[index].quantity) + 1});
            return this.#cartMongooseDAO.update(cart.id,cart.products);
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }
    async getAll(){
        try {
            const carts = this.#cartMongooseDAO.find();
            return carts;
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async getOne(cid){
        try {
            const cart = await this.#cartMongooseDAO.findById(cid);
            return cart;
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }
    async updateAll(cid,data){
        try {
            return this.#cartMongooseDAO.update(cid,data);
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async updateOne(cid,pid,quantity=1){
        try {
            const cart = await this.#cartMongooseDAO.findOne(cid);
            const index = cart.products.findIndex(product => product.pid.toString()=== pid);
            Object.assign(cart.products.at(index),{quantity:quantity});
            return this.#cartMongooseDAO.update(cid,cart.products);
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async deleteOne(cid,pid){
        try {
            const result = await this.#cartMongooseDAO.findOne(cid);
            const cartUpdated = result.products.filter(product=>product.pid.toString() !== pid);
            return this.#cartMongooseDAO.update(result.id,cartUpdated); 
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async deleteAll(cid){
        try {
            return this.#cartMongooseDAO.deletAll(cid);
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

}

export default CartManager;