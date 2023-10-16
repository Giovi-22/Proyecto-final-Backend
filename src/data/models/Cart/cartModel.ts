import mongoose from "mongoose";
import { ICartModel } from "./ICartModel";
import { productModel } from "../productModel";


const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                pid:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref: productModel
                },
                quantity: Number
        }
    ],
    default:[]
    },
})

export const cartModel = mongoose.model<ICartModel>(cartCollection,cartSchema);