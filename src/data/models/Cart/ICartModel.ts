//import { Types } from "mongoose"

import { IProduct } from "../../../domain/entities/Product/IProduct"

export interface ICartModel{
    products: ICartProduct[]
}

export interface ICartProduct{
    pid: IProduct,
    quantity:number
}
