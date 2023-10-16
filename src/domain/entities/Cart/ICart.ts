import { Types } from "mongoose";
import { ICartProduct } from "../../../data/models/Cart/ICartModel";

export interface ICart{
    id:Types.ObjectId,
    products: ICartProduct[]
}
