import { Types } from 'mongoose';

export interface IProduct{
    id: Types.ObjectId,
    title:string,
    description:string,
    category:string,
    price:number,
    stock:number,
    thumbnail:Types.Array<string>,
    code:string,
    status:boolean
}

