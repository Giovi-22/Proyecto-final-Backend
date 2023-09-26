import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IProduct } from "../../domain/entities/Product/IProduct";

const productsCollection = 'products';

const productSchema = new mongoose.Schema<IProduct>({
    title: {type:String,require:true, index:true},
    description: {type:String,require:true},
    price: {type:Number,require:true},
    thumbnail: [{type:String,require:true}],
    stock: {type:Number,require:true},
    code: {type:String,require:true, index:true},  
    status: {type:Boolean,require:true, index:true},
    category: {type:String,require:true, index:true}
})

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model<IProduct>(productsCollection,productSchema);