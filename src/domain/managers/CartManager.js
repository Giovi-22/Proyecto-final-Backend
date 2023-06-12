import CartMongooseDAO from "../../data/daos/cartMongooseDAO.js";


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
        const cart = await this.#cartMongooseDAO.findById(cid);
        return cart;
    }

    async updateAll(cid,data)
    {
        return this.#cartMongooseDAO.update(cid,data);
    }

    async updateOne(cid,pid,quantity=1)
    {
        const cart = await this.#cartMongooseDAO.findOne(cid);
        const index = cart.products.findIndex(product => product.pid.toString()=== pid);
        Object.assign(cart.products.at(index),{quantity:quantity});
        return this.#cartMongooseDAO.update(cid,cart.products);
    }

    async deleteOne(cid,pid)
    {
        const result = await this.#cartMongooseDAO.findOne(cid);
        const cartUpdated = result.products.filter(product=>product.pid.toString() !== pid);
        return this.#cartMongooseDAO.update(result.id,cartUpdated); 
    }

    async deleteAll(cid)
    {
        return this.#cartMongooseDAO.deletAll(cid);
    }

}

export default CartManager;