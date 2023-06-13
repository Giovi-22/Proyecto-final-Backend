import CartMongooseDAO from "../../data/daos/cartMongooseDAO.js";
import { idValidation, updateCartValidation } from "../validations/validators.js";


class CartManager{

    #cartMongooseDAO;

    constructor()
    {
        this.#cartMongooseDAO = new CartMongooseDAO();
    }
    
    async createCart(cart)
    {
        const newCart = await this.#cartMongooseDAO.create(cart) ;
        return newCart;
    }

    async addOne(cid,pid)
    {
        idValidation.parse(cid);
        idValidation.parse(pid);
        const cart = await this.#cartMongooseDAO.findOne(cid);
        const index = cart.products.findIndex(product => product.pid.toString() === pid);
        if(index === -1)
        {
            cart.products.push({pid:pid,quantity:1});
            return this.#cartMongooseDAO.update(cart.id,cart.products);
        }
        Object.assign(cart.products.at(index),{quantity: (cart.products[index].quantity) + 1});
        return this.#cartMongooseDAO.update(cart.id,cart.products);
    }

    async getAll()
    {
        const carts = this.#cartMongooseDAO.find();
        return carts;
    }

    async getOne(cid)
    {
        idValidation.parse(cid);
        const cart = await this.#cartMongooseDAO.findById(cid);
        return cart;
    }

    async updateAll(cid,data)
    {
        idValidation.parse(cid);
        await updateCartValidation.parseAsync(data);
        return this.#cartMongooseDAO.update(cid,data);
    }

    async updateOne(cid,pid,quantity=1)
    {
        idValidation.parse(cid);
        idValidation.parse(pid);
        const cart = await this.#cartMongooseDAO.findOne(cid);
        const index = cart.products.findIndex(product => product.pid.toString()=== pid);
        Object.assign(cart.products.at(index),{quantity:quantity});
        return this.#cartMongooseDAO.update(cid,cart.products);
    }

    async deleteOne(cid,pid)
    {
        idValidation.parse(cid);
        idValidation.parse(pid);
        const result = await this.#cartMongooseDAO.findOne(cid);
        const cartUpdated = result.products.filter(product=>product.pid.toString() !== pid);
        return this.#cartMongooseDAO.update(result.id,cartUpdated); 
    }

    async deleteAll(cid)
    {
        idValidation.parse(cid);
        return this.#cartMongooseDAO.deletAll(cid);
    }

}

export default CartManager;