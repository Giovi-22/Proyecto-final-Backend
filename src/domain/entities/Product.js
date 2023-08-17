class Product{

    constructor(props){
        this.id= props.id;
        this.title= props.title;
        this.description= props.description;
        this.category= props.category;
        this.price= props.price;
        this.stock= props.stock;
        this.thumbnail= props.thumbnail;
        this.code= props.code;
        this.owner = props.owner;
    }
}

export default Product;

