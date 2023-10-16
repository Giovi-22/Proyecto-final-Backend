import { Types } from "mongoose"

export interface ICartModel{
    products: ICartProduct[]
}

export interface ICartProduct{
    pid:Types.ObjectId | Object,
    quantity:number
}
