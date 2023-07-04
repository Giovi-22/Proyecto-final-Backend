
class Ticket{
    #id;
    #code;
    #purchase_datetime;
    #amount;
    #purchaser;
    #products;

    constructor(props){
    this.#id = props.id;
    this.#code = props.code;
    this.#purchase_datetime = props.purchase_datetime;
    this.#amount = props.amount;
    this.#purchaser = props.purchaser;
    this.#products = props.products;
    }

    getData(){
        return {
            id: this.#id,
            code: this.#code,
            purchase_datetime: this.#purchase_datetime,
            amount: this.#amount,
            purchaser: this.#purchaser,
            products: this.#products
        }
    }
}

export default Ticket;