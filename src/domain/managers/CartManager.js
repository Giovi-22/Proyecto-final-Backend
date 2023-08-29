import container from "../../container.js";
import Cart from "../entities/Cart.js";
import { idValidation, updateCartValidation } from "../validations/validators.js";
import ProductManager from "./ProductManager.js";


class CartManager{

    #cartRepository;
    #productRepository;

    constructor()
    {
        this.#cartRepository= container.resolve('CartRepository');
        this.#productRepository = container.resolve('ProductRepository');
    }
    
    async createCart(cart)
    {
        const newCart = await this.#cartRepository.create(cart) ;
        return newCart;
    }

    async addOne(cid,pid,user)
    {
        idValidation.parse(cid);
        idValidation.parse(pid);
        const cart = await this.#cartRepository.findOne(cid);
        //si el producto le pertenece al usuario premium, no lo agrega
        const dbProduct = await this.#productRepository.findById(pid);
        if(dbProduct.owner === user.email){
            throw new Error("Can't add your product to the cart",{cause:'Bad Request'})
        }
        const index = cart.products.findIndex(product => product.pid.toString() === pid);
        if(index === -1)
        {
            //el producto no existe
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
        let purchaseDto ={
            availableProducts:[],
            unavailableProducs:[]
        };
        const cart = await this.getOne(cid);

        for await (const product of cart.getProducts()){
            const isAvailable = product.product.status;
            if(product.quantity > product.product.stock || !isAvailable){
                purchaseDto.unavailableProducs.push(product);
            }
            else{
                purchaseDto.availableProducts.push(product);
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

    async updateOne(cid,pid,quantity=1,user)
    {
        idValidation.parse(cid);
        idValidation.parse(pid);
        await this.#isOwnCart(cid,user);
        const cart = await this.#cartRepository.findOne(cid);
        const index = cart.products.findIndex(product => product.pid.toString()=== pid);
        Object.assign(cart.products.at(index),{quantity:quantity});
        return this.#cartRepository.update(cid,cart.products);
    }
    
    async deleteOne(cid,pid,user)
    {
        idValidation.parse(cid);
        idValidation.parse(pid);
        await this.#isOwnCart(cid,user);
        const result = await this.#cartRepository.findOne(cid);
        const cartUpdated = result.products.filter(product=>product.pid.toString() !== pid);
        return this.#cartRepository.update(result.id,cartUpdated); 
    }

    async deleteAll(cid,user)
    {
        idValidation.parse(cid);
        await this.#isOwnCart(cid,user);
        return this.#cartRepository.deletAll(cid);
    }

    async #isOwnCart(cid,user){
        if(!user.cart.length){
            throw new Error(`The user ${user.email} doesn't have a cart`)
        }
        const isOwnCart = user.cart.some(cart => cart.toString() === cid);
        if(!isOwnCart){
            throw new Error(`The cart don't belong to the current user`,{cause: 'Bad Request'})
        }
        return isOwnCart;
    }

}

export default CartManager;