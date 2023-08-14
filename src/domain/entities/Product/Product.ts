import { IProduct } from "./IProduct";

class Product{

    id:string;
    title:string;
    description:string;
    category:string;
    price:number;
    stock:number;
    thumbnail:string[];
    code:string;
    status:boolean;

    constructor(product:IProduct){
        this.id= product.id;
        this.title= product.title;
        this.description= product.description;
        this.category= product.category;
        this.price= product.price;
        this.stock= product.stock;
        this.thumbnail= product.thumbnail;
        this.code= product.code;
        this.status= product.status
    }
}

export default Product;

