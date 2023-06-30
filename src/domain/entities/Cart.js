class Cart{

    constructor(props){
        this.id = props.id;
        this.products = props.products;
    }

    getProducts(){
        return this.products;
    }
}

export default Cart;