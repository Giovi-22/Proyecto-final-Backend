import { cartModel } from "../models/cartModel.js"


class CartMongooseDAO{

    async create(newCart)
    {
        const cart = await cartModel.create(newCart);
        return {
            id: cart._id,
            products: cart.products
        };
    }

    async update(cid,data)
    {
        const cart = await cartModel.findOneAndUpdate({_id:cid},{$set:{products :data}},{new:true});
        if(!cart)
        {
            throw new Error(`El carrito con id ${cid} no existe.`,{cause:'Not Found'});
        }
        return {
            id:cart._id,
            products:cart.products.map(product =>({pid:product.pid,quantity:product.quantity}))
        };
    }

    async find()
    {
        const carts = await cartModel.find({});
        if(!carts.length)
        {
            throw new Error("No existen carritos en la base de datos",{cause:'Not Found'});
        }
        return carts.map(cart=>({
            id:cart.id,
            products: cart.products.map(product =>({pid:product.pid,quantity:product.quantity}))
        }));
    }

    async findOne(cid)
    {
        const cart = await cartModel.findById(cid);
        if(!cart)
        {
            throw new Error(`El carrito con id ${cid} no existe.`,{cause:'Not Found'});
        }
        return {
            id:cart._id,
            products:cart.products
        };
    }  
    
    async findById(cid)
    {
        const cart = await cartModel.findById(cid).populate("products.pid");
        if(!cart)
        {
            throw new Error(`El carrito con id ${cid} no existe.`,{cause:'Not Found'});
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
    }

    async deletAll(cid)
    {
        const result = await this.update(cid,[]);
        return result;
    }

}

export default CartMongooseDAO;