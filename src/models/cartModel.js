import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                pid:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'products'      //coleccion a la que hace referencia el campo pid
                },
                quantity: Number
        }
    ],
    default:[]
    },
})

export const cartModel = mongoose.model(cartCollection,cartSchema);