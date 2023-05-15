import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
    "title": {type:String,require:true, index:true},
    "description": {type:String,require:true},
    "price": {type:Number,require:true},
    "thumbnail": {type:Array,require:true},
    "stock": {type:Number,require:true},
    "code": {type:String,require:true, index:true},  
    "status": {type:Boolean,require:true, index:true},
    "category": {type:String,require:true, index:true}
})
productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productsCollection,productSchema);