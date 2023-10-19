//import { Types } from "mongoose";
import Cart from "../../domain/entities/Cart/Cart";
import { ICart } from "../../domain/entities/Cart/ICart";
//import Product from "../../domain/entities/Product/Product";
import CustomErrors from "../../shared/CustomErrors";
//import { ICartModel } from "../models/Cart/ICartModel";
import { cartModel } from "../models/Cart/cartModel"




class CartMongooseRepository{

    async create(newCart:ICart)
    {
        const cart = await cartModel.create(newCart);
        return new Cart({
            id: cart._id,
            products: cart.products
        });
    }

    async update(cid:string,data:ICart)
    {
        const cart = await cartModel.findOneAndUpdate({_id:cid},{$set:{products :data}},{new:true});
        if(!cart)
        {
            throw new CustomErrors(`El carrito con id ${cid} no existe.`,{cause:'Not Found'});
        }
        return new Cart({
            id:cart._id,
            products:cart.products.map(product =>({pid:product.pid,quantity:product.quantity}))
        });
    }

    async find()
    {
        const carts = await cartModel.find({});
        if(!carts.length)
        {
            throw new CustomErrors("No existen carritos en la base de datos",{cause:'Not Found'});
        }
        return carts.map(cart=>new Cart({
            id:cart.id,
            products: cart.products.map(product =>({pid:product.pid,quantity:product.quantity}))
        }));
    }

    async findOne(cid:string)
    {
        const cart = await cartModel.findById(cid);
        if(!cart)
        {
            throw new CustomErrors(`El carrito con id ${cid} no existe.`,{cause:'Not Found'});
        }
        return new Cart({
            id:cart._id,
            products:cart.products
        });
    }  
    
    async findById(cid:string)
    {
        const cart = await cartModel.findById(cid).populate({path:"products.pid"});
        if(!cart)
        {
            throw new CustomErrors(`El carrito con id ${cid} no existe.`,{cause:'Not Found'});
        }
        cart.products.forEach((product) => {
            const productsDetails = product.pid;
            console.log("El producto es: ",productsDetails.title)
            
        });
/*
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
            }
        )
        )       
        };
*/
    }

/*
    async deletAll(cid:string)
    {
        const result = await this.update(cid,[]);
        return result;
    }
*/
}

export default CartMongooseRepository;