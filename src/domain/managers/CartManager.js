import container from "../../container.js";
import Cart from "../entities/Cart.js";
import { idValidation, updateCartValidation } from "../validations/validators.js";
import ProductManager from "./ProductManager.js";


class CartManager{

    #cartRepository;

    constructor()
    {
        this.#cartRepository= container.resolve('CartRepository');
    }
    
    async createCart(cart)
    {
        const newCart = await this.#cartRepository.create(cart) ;
        return newCart;
    }

    async addOne(cid,pid)
    {
        idValidation.parse(cid);
        idValidation.parse(pid);
        const cart = await this.#cartRepository.findOne(cid);
        const index = cart.products.findIndex(product => product.pid.toString() === pid);
        if(index === -1)
        {
            cart.products.push({pid:pid,quantity:1});
            return this.#cartRepository.update(cart.id,cart.products);
        }
        Object.assign(cart.products.at(index),{quantity: (cart.products[index].quantity) + 1});
        return this.#cartRepository.update(cart.id,cart.products);
    }

    async getAll()
    {
        const carts = this.#cartRepository.find();
        return carts;
    }

    async getOne(cid)
    {
        idValidation.parse(cid);
        const cart = await this.#cartRepository.findById(cid);
        return cart;
    }

    async finishPurchase(cid){
        const productM = new ProductManager();
        let purchaseDto ={
            availableProducts:[],
            unavailableProducs:[]
        };
        const cart = await this.getOne(cid);

        if(!cart){
            throw new Error('El carrito no existe',{cause:"Bad Request"});
        }

        for await (const product of cart.getProducts()){
            const isAvailable = product.product.status;
            if(product.quantity > product.product.stock || !isAvailable){
                purchaseDto.unavailableProducs.push(product);
            }
            else{
                purchaseDto.availableProducts.push(product);
                const updatedStock = (product.product.stock - product.quantity) >= 0 ? (product.product.stock - product.quantity) : 0;
                await productM.update(product.product.id,{stock: updatedStock});
            }
        };
        return purchaseDto;
    }

    async updateAll(cid,data)
    {
        idValidation.parse(cid);
        await updateCartValidation.parseAsync(data);
        return this.#cartRepository.update(cid,data);
    }

    async updateOne(cid,pid,quantity=1)
    {
        idValidation.parse(cid);
        idValidation.parse(pid);
        const cart = await this.#cartRepository.findOne(cid);
        const index = cart.products.findIndex(product => product.pid.toString()=== pid);
        Object.assign(cart.products.at(index),{quantity:quantity});
        return this.#cartRepository.update(cid,cart.products);
    }

    async deleteOne(cid,pid)
    {
        idValidation.parse(cid);
        idValidation.parse(pid);
        const result = await this.#cartRepository.findOne(cid);
        const cartUpdated = result.products.filter(product=>product.pid.toString() !== pid);
        return this.#cartRepository.update(result.id,cartUpdated); 
    }

    async deleteAll(cid)
    {
        idValidation.parse(cid);
        return this.#cartRepository.deletAll(cid);
    }

}

export default CartManager;