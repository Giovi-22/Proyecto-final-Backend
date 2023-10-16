import { Types } from "mongoose";
import { ICart } from "./ICart";
import { ICartProduct } from "../../../data/models/Cart/ICartModel";

class Cart{
    id:Types.ObjectId;
    products:ICartProduct[];

    constructor(props:ICart){
        this.id = props.id;
        this.products = props.products;
    }

    getProducts(){
        return this.products;
    }
}

export default Cart;