import { cartModel } from "../models/cartModel.js"


class CartMongooseDAO{

    async create(newCart){
        try {
            const cart = await cartModel.create(newCart);
            return {
                id: cart._id,
                products: cart.products
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(cid,data){
        try {
            const cart = await cartModel.findOneAndUpdate({_id:cid},{$set:{products :data}},{new:true});
            if(!cart){
                throw new Error(`El carrito con id ${cid} no existe.`,{cause:404});
            }
            return {
                id:cart._id,
                products:cart.products.map(product =>({pid:product.pid,quantity:product.quantity}))
            };
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async find(){
        try {
            const carts = await cartModel.find({});
            if(!carts.length){
                throw new Error("No existen carritos en la base de datos",{cause:404});
            }
            return carts.map(cart=>({
                id:cart.id,
                products: cart.products.map(product =>({pid:product.pid,quantity:product.quantity}))
            }))
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async findOne(cid){
        try {
            const cart = await cartModel.findById(cid);
            if(!cart){
                throw new Error(`El carrito con id ${cid} no existe.`,{cause:404});
            }
            return {
                id:cart._id,
                products:cart.products
            }
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }  
    
    async findById(cid){
        try {
            const cart = await cartModel.findById(cid).populate("products.pid");
            if(!cart){
                throw new Error(`El carrito con id ${cid} no existe.`,{cause:404});
            }
            return {
                id:cart._id,
                products: cart.products.map(product => ({
                    product:{
                        id:product.pid.id,
                        title:product.pid.title,
                        description: product.pid.description,
                        category: product.pid.category,
                        price: product.pid.price,
                        thumbnail: product.pid.thumbnail,
                        stock: product.pid.stock,
                        code:product.pid.code,
                        status: product.pid.status
                    },
                    quantity: product.quantity
                }))
                    
            };
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

    async deletAll(cid){
        try {
            const result = await this.update(cid,[]);
            return result;
        } catch (error) {
            throw new Error(error.message,{cause:error.cause || 500});
        }
    }

}

export default CartMongooseDAO;